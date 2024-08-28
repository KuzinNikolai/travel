import { generateHeader } from "@share/api";
import { API_DOMAIN } from "@share/constants/API_DOMAIN";
import { safeFetch } from "@share/lib";

export async function getAllOrders(token: string) {
	const resp = await safeFetch(`${API_DOMAIN}/api/v1/my_orders`, {
		method: "GET",
		headers: generateHeader(token)
	})

	if (!resp) {
		return null
	}

	return resp
}