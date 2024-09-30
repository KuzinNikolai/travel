import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverFetcher } from "@share/packages/fetcher"
import { supplierOffer, tourSchema } from "@share/schemas"
import { getLocale } from "next-intl/server"

export async function getSupplierTours(locale?: string) {
	const lang = locale || (await getLocale())

	return await serverFetcher({
		name: "getSupplierTours",
		url: `${API_DOMAIN}/${lang}/api/v1/myoffers/`,
		method: "GET",
		responseSchema: supplierOffer.array(),
		errorReturn: [],
	})
}
