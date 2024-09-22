import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverFetcher } from "@share/packages/fetcher"
import { tourSchema } from "@share/schemas"

export async function getTours() {
	return await serverFetcher({
		name: "getTours",
		url: `${API_DOMAIN}/api/v1/tours/`,
		method: "GET",
		responseSchema: tourSchema.array(),
		errorReturn: [],
	})
}
