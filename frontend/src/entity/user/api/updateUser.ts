import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { fetcher } from "@share/packages/fetcher"
import { print } from "@share/packages/logger"
import { memoUsers } from "@share/packages/memo"
import { safe, safeApi } from "@share/packages/safeApi"
import { type User, userSchema } from "@share/schemas"

export async function updateUser(updateData: Partial<User> | FormData, token: string) {
	const resp = await fetcher(`${API_DOMAIN}/api/v1/auth/users/me/`, {
		method: "PATCH",
		body: updateData instanceof FormData ? updateData : safeApi.json.stringify(updateData),
		token,
	})

	if (!resp) {
		print.fatal("[editUserAction]", "no response")
		return "INTERNAL_SERVER_ERROR"
	}

	const parseText = await safe(resp.text())

	if (!parseText.success) {
		print.fatal("[editUserAction]", parseText.error)
		return "INTERNAL_SERVER_ERROR"
	}

	const json = safeApi.json.parse(parseText.data)

	if (!json) {
		print.fatal("[editUserAction]", parseText.data)
		return "INTERNAL_SERVER_ERROR"
	}

	const { success, data, error } = await userSchema.safeParseAsync(json)

	if (!success) {
		print.fatal("[editUserAction]", json, error)
		return "INTERNAL_SERVER_ERROR"
	}

	if ("first_name" in data && Array.isArray(data.first_name)) {
		print.fail("[editUserActionFail]", json)
		return "INPUT_PARSE_ERROR"
	}

	if ("last_name" in data && Array.isArray(data.last_name)) {
		print.fail("[editUserActionFail]", json)
		return "INPUT_PARSE_ERROR"
	}

	memoUsers.set(token, data)

	return "SUCCESS"
}
