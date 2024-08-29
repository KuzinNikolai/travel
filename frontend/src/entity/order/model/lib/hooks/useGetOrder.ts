import { useMemo } from "react"
import type { Order } from "../../schemas/order.schema"
import { useGetAllOrders } from "./useGetAllOrders"

export function useGetOrder(orderNumber: Order["order_number"]) {
	const query = useGetAllOrders()

	const order = useMemo(
		() => query.data?.find(({ order_number }) => orderNumber === order_number) || null,
		[query.data, orderNumber],
	)

	return {
		order,
		query,
	}
}
