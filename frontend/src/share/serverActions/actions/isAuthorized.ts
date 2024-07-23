import { userSchema } from "@entity/user"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverErrorResponseSchema, tokenSchema } from "@share/constants/schemes"
import { logger, SafeJson } from "@share/lib"
import { z } from "zod"
import { createServerActionProcedure, ZSAError } from "zsa"

const outputSchema = z.promise(z.object({ user: userSchema, token: z.string() }))
const userResponseSchema = userSchema

const detailInvalidToken = /^Недопустимый токен.$/gi

export const isAuthorized = createServerActionProcedure()
	.input(z.object({ token: tokenSchema }))
	.output(outputSchema)
	.handler(async ({ input: { token } }) => {
		const resp = await fetch(`${API_DOMAIN}/api/v1/auth/users/me`, {
			method: "GET",
			headers: { Authorization: `Token ${token}` },
		})

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal(text)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		const { success, data, error } = await userResponseSchema.or(serverErrorResponseSchema).safeParseAsync(json)

		if (!success) {
			logger.fatal("[isAuthorized] parsing user response error:", error)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		if ("detail" in data) {
			const isInvalidToken = detailInvalidToken.test(data.detail)

			if (isInvalidToken) {
				throw new ZSAError("NOT_AUTHORIZED")
			}

			throw new ZSAError("NOT_AUTHORIZED")
		}

		return {
			token,
			user: data,
		}
	})
