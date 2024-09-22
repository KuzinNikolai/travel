"use server"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { isErrorResponse, serverFetcher } from "@share/packages/fetcher"
import { print } from "@share/packages/logger"
import { memoOrders } from "@share/packages/memo"
import { orderSchema } from "@share/schemas"
import { getLocale } from "next-intl/server"
import { cookies } from "next/headers"

export async function getAllOrders(token: string) {
	const clientCookies = cookies()
	
	print.debug("[getAllOrders]", clientCookies)

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
