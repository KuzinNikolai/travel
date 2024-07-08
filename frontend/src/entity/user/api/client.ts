"use client"

import { userResponseSchema } from "@api/user/_schema"
import { clientAxiosWithToken } from "@share/api/model/clientAxios"

export async function getUser() {
	try {
		const res = await clientAxiosWithToken.get("/user")

		const { success, data } = userResponseSchema.safeParse(res.data)

		if (!success) {
			return null
		}

		return data
	} catch (e) {
		return null
	}
}
