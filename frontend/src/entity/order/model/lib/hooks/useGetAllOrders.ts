"use client"

import { useServerActionQuery } from "@share/serverActions/model"
import { getAllOrdersAction } from "../serverActions/getAllOrdersAction"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"

export function useGetAllOrders() {
	const query = useServerActionQuery(getAllOrdersAction, {
		input: {},
		queryKey: queryKeyFactory.supplierOrders(),
	})

	return query
}
