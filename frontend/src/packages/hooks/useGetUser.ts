import type { UserData } from "@packages/schemes/users/user.schema"
import { useEffect, useState } from "react"
import { z } from "zod"
import { getCurrentUser } from "../API/fetches/user/client"
import { userSchema } from "../schemes/users/user.schema"
import { useUserPersistStore } from "../stores/user"
import { logger } from "../utils/logger"

export const useGetUser = () => {
	const { getToken, setToken } = useUserPersistStore()
	const [user, setUser] = useState<UserData | null>(null)
	const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

	useEffect(() => {
		;(async () => {
			const token = getToken()

			if (!token) {
				return
			}

			try {
				const user = await getCurrentUser(token)
				const { data, error } = userSchema.or(z.object({ code: z.string() })).safeParse(await user.json())

				if (!data) {
					logger.warn("Invalid response user data", error)
					return
				}

				if ("code" in data) {
					setStatus("error")
					setToken(null)
					return
				}

				setUser(data)
				setStatus("success")
			} catch (e) {
				setStatus("error")
			}
		})()
	}, [getToken()])

	return {
		user,
		isAuthorized: getToken() !== null,
		loading: status === "loading",
		success: status === "success",
		error: status === "error",
	}
}
