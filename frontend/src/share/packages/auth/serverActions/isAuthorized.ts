import { getUser, } from "@entity/user"
import { userSchema } from "@share/schemas"
import { cookies } from "next/headers"
import { z } from "zod"
import { createServerActionProcedure, ZSAError } from "zsa"

const outputSchema = z.promise(z.object({ user: userSchema, token: z.string() }))

export const isAuthorized = createServerActionProcedure()
	.input(z.object({}))
	.output(outputSchema)
	.handler(async () => {
		const clientCookies = cookies()

		const authorization = clientCookies.get("Authorization")

		if (!authorization) {
			throw new ZSAError("NOT_AUTHORIZED")
		}

		function deleteToken() {
			clientCookies.delete("Authorization")
		}

		const [type, token] = authorization.value.split(" ")

		const resp = await getUser(token)

		switch (resp) {
			case getUser.errors.INVALID_TOKEN: {
				deleteToken()
				throw new ZSAError("INPUT_PARSE_ERROR")
			}
			case getUser.errors.NOT_AUTHORIZED: {
				deleteToken()
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

		return resp
	})
