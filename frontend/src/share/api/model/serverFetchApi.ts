import { StatusCodes, serverErrorResponseSchema } from "@share/api"
import { SafeJson, Time, isError, logger } from "@share/lib"
import type { z } from "zod"
import { API_DOMAIN } from "../constants"

export type FetchMethods = NonNullable<Parameters<typeof window.fetch>[1]>

export type HTTP_METHODS = "POST" | "GET" | "PUT" | "DELETE"

const DEFAULT_CACHE_TIME = Time.toMs("5m")

interface IFetchOptions<SuccessRes> {
	schema?: z.ZodType<SuccessRes>
	onError?: (res: FetchReject) => void
}

interface BaseData {
	ok: boolean
	statusCode: number
}

export type FetchResolve<Data> = BaseData &
	(
		| {
				ok: true
				schemaParsed: true
				data: Data
		  }
		| {
				ok: true
				schemaParsed: false
				data: unknown
		  }
	)

export type FetchReject = BaseData &
	(
		| {
				ok: false
				errorParsed: false
				message?: unknown
		  }
		| {
				ok: false
				errorParsed: true
				message: z.infer<typeof serverErrorResponseSchema> | string
		  }
	)

type FetchOptions<Success = unknown> = Omit<FetchMethods, "method"> & IFetchOptions<Success>

export const defaultOptions = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": "true",
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	next: {
		revalidate: DEFAULT_CACHE_TIME,
	},
} satisfies FetchOptions

export const serverFetchApi = async <Success>(
	url: string,
	method: HTTP_METHODS,
	options?: FetchOptions<Success>,
): Promise<FetchResolve<Success> | FetchReject> => {
	const _url = url.trim()

	logger.debug("Fetch data by url", `${API_DOMAIN}/api/v1/${_url}`)

	try {
		const assOptions = Object.assign({}, defaultOptions, {
			...options,
			headers: {
				...defaultOptions.headers,
				...options?.headers,
			},
			next: {
				...defaultOptions.next,
				...options?.next,
			},
		})

		const response = await fetch(`${API_DOMAIN}/api/v1/${_url}`, {
			method,
			...assOptions,
		})

		const resText = await response.text()
		const json = SafeJson.parse(resText)

		if (!response.ok) {
			let error: FetchReject

			if (json) {
				const { success, data: parsedData } = await serverErrorResponseSchema.safeParseAsync(json)

				if (success) {
					error = {
						ok: false,
						statusCode: response.status,
						errorParsed: true,
						message: parsedData,
					}
				} else {
					error = {
						ok: false,
						statusCode: response.status,
						errorParsed: false,
						message: json || resText,
					}
				}

				options?.onError?.(error)
				return error
			}
		}

		if (!options?.schema) {
			return {
				ok: true,
				schemaParsed: false,
				statusCode: response.status,
				data: json || resText,
			}
		}

		const { success, data: parsedData, error: parsedError } = await options.schema.safeParseAsync(json)

		if (!success) {
			logger.fail("Response not valid. Failed to parse data", parsedError)
			return {
				ok: true,
				schemaParsed: false,
				statusCode: response.status,
				data: json || resText,
			}
		}

		return {
			ok: true,
			schemaParsed: true,
			statusCode: response.status,
			data: parsedData,
		}
	} catch (error) {
		if (isError(error)) {
			logger.fail("Fetch error:", error)
		}

		const errorMessage: FetchReject = {
			ok: false,
			statusCode: StatusCodes.CLIENT_ERROR,
			errorParsed: false,
		}

		options?.onError?.(errorMessage)
		return errorMessage
	}
}

export const serverFetchApiWithToken = async <Success>(
	url: string,
	method: HTTP_METHODS,
	token: string,
	options?: FetchOptions<Success>,
): Promise<FetchResolve<Success> | FetchReject> =>
	serverFetchApi(url, method, {
		...options,
		headers: {
			...options?.headers,
			Authorization: token,
		},
	})
