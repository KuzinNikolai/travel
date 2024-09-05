import { generateHeader } from "@share/api"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { safeFetch } from "@share/lib"

export async function getAllOrders(token: string) {
	const resp = await safeFetch(`${API_DOMAIN}/api/v1/my_orders`, {
		method: "GET",
		headers: generateHeader(token),
		cache: "force-cache",
		next: { revalidate: 3600 },
	})

	if (!resp) {
		return null
	}

	return resp
}
