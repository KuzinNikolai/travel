import { getAllOrders } from "@entity/order/api/getAllOrders"

export async function getOrderById(id: number) {
	const orders = await getAllOrders()
	return orders ? orders.find((order) => order.id === id) || null : null
}
