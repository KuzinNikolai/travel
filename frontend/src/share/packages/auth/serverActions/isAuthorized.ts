import { getUser } from "@entity/user"
import { print } from "@share/packages/logger"
import { safe } from "@share/packages/safeApi"
import { userSchema } from "@share/schemas"
import { cookies } from "next/headers"
import { z } from "zod"
import { createServerActionProcedure, ZSAError } from "zsa"
import { TokenManager } from "../libs/TokenManager"

const outputSchema = z.promise(
	z.object({
		user: userSchema,
		token: z.string(),
	}),
)

export const isAuthorizedAction = createServerActionProcedure()
	.input(z.void())
	.output(outputSchema)
	.handler(async () => {
		const clientCookies = cookies()

		const tokenManager = new TokenManager(clientCookies)

		const { token } = tokenManager.token

		if (!token) {
			throw new ZSAError("NOT_AUTHORIZED")
		}

		const { success: successFetchUser, data: userData, error: errorFetchUser } = await safe(getUser(token))

		if (!successFetchUser) {
			print.debug("[isAuthorized - getUser - error]", errorFetchUser)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		switch (userData) {
			case getUser.errors.INVALID_TOKEN: {
				tokenManager.deleteToken()
				throw new ZSAError("INPUT_PARSE_ERROR")
			}
			case getUser.errors.NOT_AUTHORIZED: {
				tokenManager.deleteToken()
				throw new ZSAError("NOT_AUTHORIZED")
			}
			case getUser.errors.INTERNAL_SERVER_ERROR: {
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}
			case getUser.errors.INVALID_USER: {
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}
			case getUser.errors.VALIDATION_ERROR: {
				throw new ZSAError("INPUT_PARSE_ERROR")
			}
		}

		return userData
	})
