"use client"

// import { userResponseSchema } from "@api/user/_schema"
import { useUserTokenStore } from "@entity/user/model/userTokenStore"
import { clientAxiosWithToken } from "@share/api/model/clientAxios"
import { logger } from "@share/lib"
import { useEffect } from "react"
import { useQuery } from "react-query"

async function getUser() {
	try {
		const res = await clientAxiosWithToken.get("/externalApi/user")

		// const { success, data, error } = userResponseSchema.safeParse(res.data)

		// if (!success) {
		// 	logger.error("Invalid response", error)
		// 	return null
		// }

		return res
	} catch (e) {
		logger.error("Failed get user", e)
		return null
	}
}

function useGetUser() {
	const { getToken } = useUserTokenStore()

	const query = useQuery("user", getUser, {
		enabled: getToken() !== null,
		refetchOnWindowFocus: true,
		keepPreviousData: true,
	})

	useEffect(() => {
		if (!query.data) {
			return
		}

		if ("code" in query.data) {
			switch (query.data.code) {
				case "INVALID_TOKEN": {
					logger.error("Invalid token", query.data)
					break
				}
				default:
			}
		}
	}, [getToken()])

	return query
}

export { getUser, useGetUser }
