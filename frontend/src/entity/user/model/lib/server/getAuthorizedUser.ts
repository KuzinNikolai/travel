"use server"

import { getUser } from "@entity/user/api/getUser"
import { cookies } from "next/headers"

export async function getAuthorizedUser() {
	const clientCookies = cookies()

	const authorization = clientCookies.get("authorization")

	if (!authorization) {
		return
	}

	const [, token] = authorization.value.split(" ")

	const resp = await getUser(token)

	switch (resp) {
		case getUser.errors.INVALID_TOKEN:
			return
		case getUser.errors.NOT_AUTHORIZED:
			return
		case getUser.errors.INTERNAL_SERVER_ERROR:
			return
		case getUser.errors.INVALID_USER:
			return
		case getUser.errors.VALIDATION_ERROR:
			return
	}

	return resp.user
}
