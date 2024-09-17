import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { type Locales, i18nConfig } from "@share/i18n"
import { serverFetcher } from "@share/packages/fetcher"
import { reviewSchema } from "../models/schemas/review"

export async function getTourReviews(tourId: number, lang: Locales[number] = i18nConfig.defaultLocale) {
	return await serverFetcher({
		name: "getTourReviews",
		url: `${API_DOMAIN}/${lang}/api/v1/tours/${tourId}/reviews`,
		method: "GET",
		responseSchema: reviewSchema.array(),
		errorReturn: [],
	})
}
