import { API_DOMAIN } from "@share/constants/API_DOMAIN";
import { serverFetcher } from "@share/packages/fetcher";
import { detailCitySchema } from "@share/schemas";
import { getLocale } from "next-intl/server";

export async function getDetailCity(citySlug: string, locale?: string) {
	const lang = locale || (await getLocale());

	return await serverFetcher({
		name: "getDetailCity",
		url: `${API_DOMAIN}/${lang}/api/v1/cities/city/${citySlug}`,
		method: "GET",
		responseSchema: detailCitySchema,
	});
}
