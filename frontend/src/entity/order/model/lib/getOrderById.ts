import { getAllOrders } from "@entity/order/api/getAllOrders"

export async function getOrderById(id: number, token: string) {
	const orders = await getAllOrders(token)
	return orders ? orders.find((order) => order.id === id) || null : null
}
