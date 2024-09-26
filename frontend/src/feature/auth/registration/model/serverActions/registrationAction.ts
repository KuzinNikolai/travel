"use server"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { fetcher } from "@share/packages/fetcher"
import { print } from "@share/packages/logger"
import { safe, safeApi } from "@share/packages/safeApi"
import { z } from "zod"
import { ZSAError, createServerAction } from "zsa"
import { type RegistrationData, registrationDataSchema } from "../schema"

const registrationServerResponseSchema = registrationDataSchema.omit({
	password: true,
})
const registrationServerErrorResponseSCheme = z.object({
	email: z.string().array(),
})

export const registrationAction = createServerAction()
	.input(registrationDataSchema)
	.output(z.void())
	.handler(async ({ input }) => {
		const resp = await fetcher(
			`${API_DOMAIN}/api/v1/register/`,
			{
				method: "POST",
				body: safeApi.json.stringify<Required<RegistrationData>>({
					first_name: "",
					last_name: "",
					age: null,
					...input,
				}),
			},
			"[registrationAction]",
		)

		if (!resp) {
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const {
			success: parseTextSuccess,
			data: text,
			error: parseTextError,
		} = await safe(resp.text(), "[registrationAction] text")

		if (!parseTextSuccess) {
			print.fatal(`[registrationAction] ${parseTextError}`)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const json = safeApi.json.parse(text)

		if (!json) {
			print.fatal(`[registrationAction] ${text}`)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const { success, data, error } = await registrationServerResponseSchema
			.or(registrationServerErrorResponseSCheme)
			.safeParseAsync(json)

		if (!success) {
			print.fatal(`[registrationAction] ${error.message}`)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		if ("email" in data && Array.isArray(data.email)) {
			throw new ZSAError("CONFLICT")
		}
	})
