import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverErrorResponseSchema } from "@share/constants/schemes"
import { logger, SafeJson } from "@share/lib"
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
	const resp = await fetch(`${API_DOMAIN}/api/v1/auth/users/me`, {
		method: "GET",
		headers: { Authorization: `Token ${token}` },
	})

	const text = await resp.text()
	const json = SafeJson.parse(text)

	if (!json) {
		return GetUserError.VALIDATION_ERROR
	}

	const { success, data, error } = await userSchema.or(serverErrorResponseSchema).safeParseAsync(json)

	if (!success) {
		logger.fatal("[isAuthorized] parsing user response error:", error)
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
}

getUser.errors = GetUserError
