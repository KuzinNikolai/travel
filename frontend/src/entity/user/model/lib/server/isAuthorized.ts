import { getUser } from "@entity/user/api/getUser"
import { cookies } from "next/headers"

export async function isAuthorized() {
	const clientCookies = cookies()

	const authorization = clientCookies.get("authorization")

	if (!authorization) {
		return false
	}

	const [, token] = authorization.value.split(" ")

	const resp = await getUser(token)

	switch (resp) {
		case getUser.errors.INVALID_TOKEN:
			return false
		case getUser.errors.NOT_AUTHORIZED:
			return false
		case getUser.errors.INTERNAL_SERVER_ERROR:
			return false
		case getUser.errors.INVALID_USER:
			return false
		case getUser.errors.VALIDATION_ERROR:
			return false
		default:
			return true
	}
}
