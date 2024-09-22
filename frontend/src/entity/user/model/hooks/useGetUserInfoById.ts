"use client"

import { useServerActionQuery, queryKeyFactory } from "@share/packages/serverActions"
import { getUserByIdAction } from "../serverActions/getUserByIdAction"

export function useGetUserInfoById(userId: number) {
	const user = useServerActionQuery(getUserByIdAction, {
		input: { id: userId },
		queryKey: queryKeyFactory.clientData(userId),
	})

	return user
}
