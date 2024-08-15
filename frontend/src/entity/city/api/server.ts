import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { serverErrorResponseSchema } from "@share/constants/schemes"
import { logger, SafeJson, Time } from "@share/lib"
import { cityItemSchema, detailCitySchema } from "../consts/schema"

export async function getCities() {
	try {
		const resp = await fetch(`${API_DOMAIN}/api/v1/cities`, {
			method: "GET",
			next: { revalidate: 4 },
		})

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal("[getCities-parse]", text)
			return []
		}

		const { success, data, error } = await cityItemSchema.array().safeParseAsync(json)

		if (!success) {
			logger.fail("[getCities-validation]", json, error)
			return []
		}

		return data
	} catch (err) {
		console.error("[getCities-catch]", err)
		return []
	}
}

export const getDetailCity = async (citySlug: string) => {
	try {
		const resp = await fetch(`${API_DOMAIN}/api/v1/cities/city/${citySlug}`, {
			method: "GET",
			next: { revalidate: 4 },
		})

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal("[getDetailCity-parse]", text)
			return
		}

		const { success, data, error } = await detailCitySchema.or(serverErrorResponseSchema).safeParseAsync(json)

		if (!success) {
			logger.fail("[getDetailCity-validation]", json, error)
			return
		}

		if ("detail" in data) {
			logger.debug("[getDetailCity-internal-error]", json, citySlug)
			return
		}

		return data
	} catch (err) {
		console.error("[getDetailCity-catch]", err)
	}
}
