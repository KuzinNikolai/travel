"use client"

import { useQuery } from "react-query"
import { useUserTokenStore } from "./userTokenStore"
import { getUser } from "../api/client"
import { logger } from "@share/lib"
import { useEffect } from "react"

export function useGetUser() {
	const { getToken } = useUserTokenStore()

	const query = useQuery("user", getUser, {
		// enabled: getToken() !== null,
		refetchOnWindowFocus: true,
		keepPreviousData: true,
	})

	// logger.debug("useGetUser", query)

	// useEffect(() => {
	// 	if (!query.data) {
	// 		return
	// 	}

	// 	if ("code" in query.data) {
	// 		switch (query.data.code) {
	// 			case "INTERNAL_SERVER_ERROR": {
	// 				logger.error("Internal server error", query.data)
	// 				break
	// 			}
	// 			case "INVALID_TOKEN": {
	// 				logger.error("Invalid token", query.data)
	// 				break
	// 			}
	// 			case "UNAUTHORIZED": {
	// 				logger.error("Unauthorized", query.data)
	// 				break
	// 			}
	// 			default:
	// 				assertExhaustive(query.data.code)
	// 		}
	// 	}
	// }, [getToken()])

	// return query
}