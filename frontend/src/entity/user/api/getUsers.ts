import { generateHeader } from "@share/api"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverErrorResponseSchema } from "@share/constants/schemes"
import { logger, SafeJson } from "@share/lib"
import { userSchema, type User } from "../consts"

export async function getUsers(token: string) {
	try {
		const resp = await fetch(`${API_DOMAIN}/api/v1/auth/users/`, { method: "GET", headers: generateHeader(token) })

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			return []
		}

		const { success, data, error } = await userSchema.array().or(serverErrorResponseSchema).safeParseAsync(json)

		if (!success) {
			logger.fail("[GetUsers-validation]", json, error)
			return []
		}

		if ("detail" in data) {
			logger.debug("[GetUsers-internal-error]", json)
			return []
		}

		return data
	} catch (err) {
		console.error("[GetUsers-catch]", err)
		return []
	}
}
