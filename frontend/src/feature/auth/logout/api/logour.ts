import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverErrorResponseSchema } from "@share/constants/schemes"
import { logger, safeFetch, SafeJson } from "@share/lib"

enum LogoutErrors {
	FORBIDDEN = "FORBIDDEN",
	INVALID_TOKEN = "INVALID_TOKEN",
	NOT_AUTHORIZED = "NOT_AUTHORIZED",
	PARSE_ERROR = "PARSE_ERROR",
	VALIDATION_RESPONSE_ERROR = "VALIDATION_RESPONSE_ERROR",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

const NOT_AUTHORIZED = /^Invalid token header. No credentials provided.$/gi
const INVALID_TOKEN = /^Invalid token.$/gi

export async function logout(token: string): Promise<LogoutErrors | { success: true }> {
	const resp = await safeFetch(`${API_DOMAIN}/api/v1/auth/token/logout`, {
		method: "POST",
		headers: {
			Authorization: `Token ${token}`,
		},
	})

	if (!resp) {
		return LogoutErrors.INTERNAL_SERVER_ERROR
	}

	const text = await resp.text()

	if (!resp.ok) {
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal("[logoutAction]", text)
			return LogoutErrors.PARSE_ERROR
		}

		const { success, data, error } = await serverErrorResponseSchema.safeParseAsync(json)

		if (!success) {
			logger.fatal("[logoutActionErrorResponseParse]", error)
			return LogoutErrors.VALIDATION_RESPONSE_ERROR
		}

		const isInvalidToken = INVALID_TOKEN.test(data.detail)
		if (isInvalidToken) {
			return LogoutErrors.INVALID_TOKEN
		}

		const isNotAuthorized = NOT_AUTHORIZED.test(data.detail)
		if (isNotAuthorized) {
			return LogoutErrors.NOT_AUTHORIZED
		}

		logger.debug("[logoutActionForbidden]", data)
		return LogoutErrors.FORBIDDEN
	}

	return { success: true }
}

logout.errors = LogoutErrors
