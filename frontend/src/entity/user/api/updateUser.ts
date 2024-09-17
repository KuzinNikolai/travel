import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { fetcher } from "@share/packages/fetcher"
import { type User, userSchema } from "../model/schemas"
import { safeApi } from "@share/packages/safeApi"
import { print } from "@share/packages/logger"

export async function updateUser(updateData: Partial<User> | FormData, token: string) {
	const resp = await fetcher(`${API_DOMAIN}/api/v1/auth/users/me/`, {
		method: "PATCH",
		body: updateData instanceof FormData ? updateData : safeApi.json.stringify(updateData),
		token,
	})

	try {
		if (!resp) {
			print.fatal("[editUserAction]", "no response")
			return "INTERNAL_SERVER_ERROR"
		}

		const text = await resp.text()
		const json = safeApi.json.parse(text)

		if (!json) {
			print.fatal("[editUserAction]", text)
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

		return "SUCCESS"
	} catch (error) {
		print.fatal("[editUserActionCatch]", error)
		return "INTERNAL_SERVER_ERROR"
	}
}
