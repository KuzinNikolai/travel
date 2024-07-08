"use client"

import { userResponseSchema } from "@api/user/_schema"
import { clientAxios } from "@share/api/model/clientAxios"
import { logger } from "@share/lib"

export async function getUser() {
	try {
		const res = await clientAxios.get("/user")

		const { success, data } = userResponseSchema.safeParse(res.data)

		if (!success) {
			return null
		}

		return data
	} catch (e) {
		logger.error("Failed get user", e)
		return null
	}
}
