"use server"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverErrorResponseSchema } from "@share/constants/schemes"
import { logger, SafeJson } from "@share/lib"
import { isAuthorized } from "@share/serverActions"
import { z } from "zod"
import { ZSAError } from "zsa"

export const logoutAction = isAuthorized
	.createServerAction()
	.output(z.void())
	.handler(async ({ ctx }) => {
		const { token } = ctx

		const resp = await fetch(`${API_DOMAIN}/api/v1/auth/token/logout`, {
			method: "POST",
			headers: {
				Authorization: `Token ${token}`,
			},
		})

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!resp.ok) {
			const { success, data, error } = await serverErrorResponseSchema.safeParseAsync(json)

			if (!success) {
				logger.fatal("[logoutActionErrorResponseParse]", error)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}

			logger.debug("[logoutActionForbidden]", data)
			throw new ZSAError("FORBIDDEN")
		}
	})
