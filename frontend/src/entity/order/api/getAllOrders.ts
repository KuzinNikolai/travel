import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { defender } from "@share/packages/auth"
import { isErrorResponse, serverFetcher } from "@share/packages/fetcher"
import { memoOrders } from "@share/packages/memo"
import { orderSchema } from "@share/schemas"
import { getLocale } from "next-intl/server"

export async function getAllOrders() {
	const token = await defender.getToken()

	if (!token) {
		return
	}

	if (memoOrders.hasMemoized(token)) {
		return memoOrders.get(token) || []
	}
	
	const orders = await serverFetcher({
		name: "getAllOrders",
		url: `${API_DOMAIN}/${await getLocale()}/api/v1/my_orders`,
		method: "GET",
		init: { token },
		responseSchema: orderSchema.array(),
		errorReturn: [],
	})

	if (isErrorResponse(orders)) {
		return []
	}

	memoOrders.set(token, orders)

	return orders
}
