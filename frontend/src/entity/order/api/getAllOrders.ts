"use server"

import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { i18nConfig, type Locales } from "@share/i18n"
import { serverFetcher } from "@share/packages/fetcher"
import { orderSchema } from "../model/schemas/order.schema"

export async function getAllOrders(token: string, lang: Locales[number] = i18nConfig.defaultLocale) {
	return await serverFetcher({
		name: "getAllOrders",
		url: `${API_DOMAIN}/${lang}/api/v1/my_orders`,
		method: "GET",
		init: { token },
		responseSchema: orderSchema.array(),
		errorReturn: [],
	})
}
