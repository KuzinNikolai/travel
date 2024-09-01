import { safeFetch } from "@share/lib"
import type { CreateOrder } from "../schemas/createOrder.schema"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { generateHeader } from "@share/api"

export async function createOrder(order: CreateOrder, token: string) {
	const resp = await safeFetch(`${API_DOMAIN}/api/v1/orders`, {
		method: "POST",
		headers: generateHeader(token),
		body: JSON.stringify(order),
	})

	if (!resp) {
		return null
	}

	return resp
}
