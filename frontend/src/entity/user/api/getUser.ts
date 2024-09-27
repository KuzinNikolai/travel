import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { baseErrorResponseSchema, fetcher } from "@share/packages/fetcher"
import { print } from "@share/packages/logger"
import { memoUsers } from "@share/packages/memo/listMemoElements/user"
import { safe, safeApi } from "@share/packages/safeApi"
import { type User, userSchema } from "@share/schemas"

const INVALID_TOKEN = /^Invalid token.$/gi
const NOT_AUTHORIZED = /^Invalid token header. No credentials provided.$/gi

enum GetUserError {
	NOT_AUTHORIZED = "NOT_AUTHORIZED",
	VALIDATION_ERROR = "VALIDATION_ERROR",
	INVALID_TOKEN = "INVALID_TOKEN",
	INVALID_USER = "INVALID_USER",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export async function getUser(token: string): Promise<{ token: string; user: User } | GetUserError> {
	const user = memoUsers.get(token)

	if (user) {
		return { token, user }
	}

	const resp = await fetcher(`${API_DOMAIN}/api/v1/auth/users/me`, { method: "GET", token })

	if (!resp) {
		return GetUserError.INVALID_USER
	}

	const { success: successTextParse, data: parsedText, error: errorTextParse } = await safe(resp.text())

	if (!successTextParse) {
		print.fatal("[isAuthorized] parsing text error:", errorTextParse)
		return GetUserError.INVALID_USER
	}

	const json = safeApi.json.parse(parsedText)

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

	memoUsers.set(token, data)

	return {
		token,
		user: data,
	}
}

getUser.errors = GetUserError
