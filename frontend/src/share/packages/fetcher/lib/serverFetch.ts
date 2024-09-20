import { print } from "@share/packages/logger"
import { safeApi } from "@share/packages/safeApi"
import type { z } from "zod"
import { fetcher, serverFetcher } from ".."
import { baseErrorResponseSchema } from "../schemas/baseErrorResponse.schema"

type FetchMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
type FetchFunc = typeof fetcher
type FetchInit = Parameters<FetchFunc>[1]

export enum ServerFetchErrors {
	PARSE_ERROR = "PARSE_ERROR",
	SERVER_ERROR = "SERVER_ERROR",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export interface ServerFetchError {
	code: ServerFetchErrors
	detail?: string
	message?: string
}

interface ServerFetchProps<ResponseSchema extends z.ZodType> {
	name: string
	url: string
	method: FetchMethods
	responseSchema: ResponseSchema
	responseNotJson?: boolean
	errorReturn?: z.infer<ResponseSchema>
	init?: FetchInit
}

export async function serverFetch<ResponseSchema extends z.ZodType>(
	options: ServerFetchProps<ResponseSchema>,
): Promise<z.infer<ResponseSchema> | ServerFetchError> {
	try {
		const resp = await fetcher(options.url, { method: options.method, ...options.init })

		if (!resp) {
			return options.errorReturn || { code: ServerFetchErrors.SERVER_ERROR }
		}

		const text = await resp.text()
		
		if (options.responseNotJson) {
			const { success, data, error } = await options.responseSchema.safeParseAsync(text)

			if (!success) {
				print.fail(`[${options.name} - validation]`, text, error)
				return options.errorReturn || { code: ServerFetchErrors.PARSE_ERROR }
			}

			return data
		}

		const json = safeApi.json.parse(text)

		if (!json) {
			print.fatal(`[${options.name} - parse]`, text)
			return options.errorReturn || { code: ServerFetchErrors.PARSE_ERROR }
		}

		const { success, data, error } = await options.responseSchema.or(baseErrorResponseSchema).safeParseAsync(json)

		if (!success) {
			print.fail(`[${options.name} - validation]`, json || text, error)
			return options.errorReturn || { code: ServerFetchErrors.PARSE_ERROR }
		}

		if ("detail" in data) {
			print.fail(`[${options.name} - exception]`, data)
			return (
				options.errorReturn || {
					code: ServerFetchErrors.INTERNAL_SERVER_ERROR,
					detail: data.detail,
					message: data.message,
				}
			)
		}

		return data
	} catch (err) {
		print.fatal(`[${options.name} - catch]`, err)
		return { code: ServerFetchErrors.INTERNAL_SERVER_ERROR }
	}
}
