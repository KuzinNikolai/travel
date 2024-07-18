"use server"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { logger, SafeJson } from "@share/lib"
import { createServerAction, ZSAError } from "zsa"
import { loginRequestSchema, loginResponseSchema, loginServerResponseSchema } from "../consts/loginActionSchema"

export const loginAction = createServerAction()
	.input(loginRequestSchema)
	.output(loginResponseSchema)
	.handler(async ({ input }) => {
		try {
			const resp = await fetch(`${API_DOMAIN}/api/v1/auth/token/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: SafeJson.stringify(input),
			})

			const text = await resp.text()

			const json = SafeJson.parse(text)

			if (!json) {
				logger.fatal("[loginAction]", text)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}

			const { success, data, error } = await loginServerResponseSchema.safeParseAsync(json)

			if (!success) {
				logger.debug("[loginActionParseResponse]", json, error)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}

			if ("non_field_error" in data) {
				throw new ZSAError("FORBIDDEN")
			}

			return { token: data.auth_token }
		} catch (e) {
			logger.fatal("[loginActionCatch]", e)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}
	})
