"use server"

import { cookies } from "next/headers"
import { TokenManager } from "./TokenManager"
import { safe } from "@share/packages/safeApi"
import { print } from "@share/packages/logger"
import { getUser as getUserQuery } from "@entity/user"

export async function getToken() {
	const tokenManager = TokenManager.getToken(cookies())
	return tokenManager.token
}

export async function getUser() {
	const token = await getToken()

	if (!token) {
		return
	}

	const { success, data, error } = await safe(getUserQuery(token))

	if (!success) {
		print.error("[getUser - error]", error)
		return
	}

	if (typeof data === "string") {
		return
	}

	return data.user
}

export async function isAuthorized() {
	return !!(await getUser())
}

export async function isStaff() {
	const user = await getUser()

	if (!user) return false

	return user.is_staff
}
