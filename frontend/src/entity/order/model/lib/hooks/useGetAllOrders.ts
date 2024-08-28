"use client"

import { useServerActionQuery } from "@share/serverActions/model"
import { getAllOrdersAction } from "../serverActions/getAllOrdersAction"
import { useUserTokenStore } from "@entity/user"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"

export function useGetAllOrders() {
	const tokenStore = useUserTokenStore()

	const query = useServerActionQuery(getAllOrdersAction, {
		input: { token: tokenStore.getToken() || "" },
		queryKey: queryKeyFactory.supplierOrders(),
	})

	return query
}
