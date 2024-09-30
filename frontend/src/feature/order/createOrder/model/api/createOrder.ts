import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { fetcher } from "@share/packages/fetcher"
import { safeApi } from "@share/packages/safeApi"
import type { CreateOrder } from "../schemas/createOrder.schema"

export async function createOrder(order: CreateOrder, token: string) {
	const resp = await fetcher(`${API_DOMAIN}/api/v1/orders/`, {
		method: "POST",
		body: safeApi.json.stringify(order),
		token,
	})

	if (!resp) {
		return null
	}

	return resp
}
