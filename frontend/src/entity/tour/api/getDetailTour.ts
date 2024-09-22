import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverFetcher } from "@share/packages/fetcher"
import { detailTourSchema } from "@share/schemas"

export async function getDetailTour(tourSlug: string) {
	return await serverFetcher({
		name: "getDetailTour",
		url: `${API_DOMAIN}/api/v1/tours/${tourSlug}`,
		method: "GET",
		responseSchema: detailTourSchema,
	})
}