"use client"

import type { UserResponse } from "@api/user/_schema"
import type { AxiosError } from "axios"
import { useMemo } from "react"
import { useQuery } from "react-query"
import { getUser } from "../api/client"
import { useUserTokenStore } from "./userTokenStore"
import { useUserStore } from "./userUserStore"

export function useGetUser() {
	const userStore = useUserStore()
	const { getToken } = useUserTokenStore()

	const query = useQuery("user", getUser, {
		enabled: getToken() !== null,
		refetchOnWindowFocus: true,
		keepPreviousData: true,

		onSuccess: (data) => {
			if (!data || "code" in data) {
				return
			}

			userStore.setUser(data)
		},
		onError: (err: AxiosError<UserResponse>) => {
			if (!err.response?.data || !("code" in err.response.data)) {
				return
			}

			switch (err.response.data.code) {
				case "UNAUTHORIZED": {
					userStore.setUser(null)
					break
				}
				default:
					break
			}
		},
	})

	const data = useMemo(() => {
		if (userStore.user) {
			return userStore.user
		}

		if (!query.isFetched || !query.data) {
			return
		}

		if ("code" in query.data) {
			return query.data.code
		}

		return query.data
	}, [query.data])

	return { data, query }
}
