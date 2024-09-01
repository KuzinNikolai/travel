"use client"

import { useServerActionQuery } from "@share/serverActions/model"
import { getUserByIdAction } from "../serverActions/getUserByIdAction"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"

export function useGetUserInfoById(userId: number) {
	const user = useServerActionQuery(getUserByIdAction, {
		input: { id: userId },
		queryKey: queryKeyFactory.clientData(userId),
	})

	return user
}
