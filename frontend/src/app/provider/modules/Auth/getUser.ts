import { getUser as getUserData } from "@entity/user"
import { cookies } from "next/headers"

export async function getUser() {
	const userCookies = cookies()

	const authorization = userCookies.get("Authorization")

	if (!authorization) {
		return null
	}

	const [type, token] = authorization.value.split(" ")

	const resp = await getUserData(token)

	function deleteToken() {
		userCookies.delete("Authorization")
	}

	switch (resp) {
		case getUserData.errors.NOT_AUTHORIZED: {
			deleteToken()
			return null
		}
		case getUserData.errors.INVALID_TOKEN: {
			deleteToken()
			return null
		}
		case getUserData.errors.INTERNAL_SERVER_ERROR: {
			return null
		}
		case getUserData.errors.INVALID_USER: {
			return null
		}
		case getUserData.errors.VALIDATION_ERROR: {
			return null
		}
	}

	return resp
}
