"use client"

import { useServerActionQuery } from "@share/serverActions/model"
import { useUserTokenStore } from "../stores/userTokenStore"
import { getUserById } from "../serverActions/getUserById"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"

export function useGetUserInfoById(userId: number) {
	const tokenStore = useUserTokenStore()

	const user = useServerActionQuery(getUserById, {
		input: { token: tokenStore.getToken() || "", id: userId },
		queryKey: queryKeyFactory.clientData(userId),
	})

	return user
}
