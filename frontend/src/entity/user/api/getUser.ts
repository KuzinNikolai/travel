import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { baseErrorResponseSchema, fetcher } from "@share/packages/fetcher"
import { print } from "@share/packages/logger"
import { safeApi } from "@share/packages/safeApi"
import { userSchema } from "../model/schemas"

const INVALID_TOKEN = /^Invalid token.$/gi
const NOT_AUTHORIZED = /^Invalid token header. No credentials provided.$/gi

enum GetUserError {
	NOT_AUTHORIZED = "NOT_AUTHORIZED",
	VALIDATION_ERROR = "VALIDATION_ERROR",
	INVALID_TOKEN = "INVALID_TOKEN",
	INVALID_USER = "INVALID_USER",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export async function getUser(token: string) {
	try {
		const resp = await fetcher(`${API_DOMAIN}/api/v1/auth/users/me`, {
			method: "GET",
			headers: { Authorization: `Token ${token}` },
		})

		if (!resp) {
			return GetUserError.INVALID_USER
		}

		const text = await resp.text()
		const json = safeApi.json.parse(text)

		if (!json) {
			return GetUserError.VALIDATION_ERROR
		}

		const { success, data, error } = await userSchema.or(baseErrorResponseSchema).safeParseAsync(json)

		if (!success) {
			print.fatal("[isAuthorized] parsing user response error:", error)
			return GetUserError.INVALID_USER
		}

		if ("detail" in data) {
			const isInvalidToken = INVALID_TOKEN.test(data.detail)

			if (isInvalidToken) {
				return GetUserError.INVALID_TOKEN
			}

			const isNotAuthorized = NOT_AUTHORIZED.test(data.detail)

			if (isNotAuthorized) {
				return GetUserError.NOT_AUTHORIZED
			}

			return GetUserError.INTERNAL_SERVER_ERROR
		}

		return {
			token,
			user: data,
		}
	} catch (error) {
		print.fatal("[getUser - exception]", error)
		return GetUserError.INTERNAL_SERVER_ERROR
	}
}

getUser.errors = GetUserError
