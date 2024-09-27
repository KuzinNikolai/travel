import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverFetcher } from "@share/packages/fetcher"
import { tourSchema } from "@share/schemas"
import { getLocale } from "next-intl/server"

export async function getTours(locale?: string) {
	const lang = locale || (await getLocale())

	return await serverFetcher({
		name: "getTours",
		url: `${API_DOMAIN}/${lang}/api/v1/tours/`,
		method: "GET",
		responseSchema: tourSchema.array(),
		errorReturn: [],
	})
}
