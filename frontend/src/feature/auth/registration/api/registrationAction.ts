"use server"

import { createServerAction, ZSAError } from "zsa"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { z } from "zod"
import {
	registrationRequestSchema,
	registrationServerErrorResponseSCheme,
	registrationServerResponseSchema,
} from "../consts/registrationAction.schema"
import { safeApi } from "@share/packages/safeApi"
import { print } from "@share/packages/logger"

export const registrationAction = createServerAction()
	.input(registrationRequestSchema)
	.output(z.void())
	.handler(async ({ input }) => {
		const resp = await fetch(`${API_DOMAIN}/api/v1/register/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: safeApi.json.stringify(input),
		})

		const text = await resp.text()
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
