"use client"

import { useServerActionQuery } from "@share/serverActions/model"
import { getUserById } from "../serverActions/getUserById"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"

export function useGetUserInfoById(userId: number) {
	const user = useServerActionQuery(getUserById, {
		input: { id: userId },
		queryKey: queryKeyFactory.clientData(userId),
	})

	return user
}
