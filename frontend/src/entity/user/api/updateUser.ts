import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { type User, userSchema } from "../consts"
import { logger, SafeJson } from "@share/lib"

const serverResponseSchema = userSchema

export async function updateUser(updateData: Partial<User> | FormData, token: string) {
	try {
		const baseHeader = { Authorization: `Token ${token}` }

		const resp = await fetch(`${API_DOMAIN}/api/v1/auth/users/me/`, {
			method: "PATCH",
			headers:
				updateData instanceof FormData ? baseHeader : Object.assign(baseHeader, { "Content-Type": "application/json" }),
			body: updateData instanceof FormData ? updateData : SafeJson.stringify(updateData),
		})

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal("[editUserAction]", text)
			return "INTERNAL_SERVER_ERROR"
		}

		const { success, data, error } = await serverResponseSchema.safeParseAsync(json)

		if (!success) {
			logger.fatal("[editUserAction]", json, error)
			return "INTERNAL_SERVER_ERROR"
		}

		if ("first_name" in data && Array.isArray(data.first_name)) {
			logger.fail("[editUserActionFail]", json)
			return "INPUT_PARSE_ERROR"
		}

		if ("last_name" in data && Array.isArray(data.last_name)) {
			logger.fail("[editUserActionFail]", json)
			return "INPUT_PARSE_ERROR"
		}

		return "SUCCESS"
	} catch (error) {
		logger.fatal("[editUserActionCatch]", error)
		return "INTERNAL_SERVER_ERROR"
	}
}
