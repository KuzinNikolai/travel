import { detailTourSchema, tourSchema } from "@entity/tour"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { logger, SafeJson, Time } from "@share/lib"
import { cityItemSchema, detailCitySchema } from "../consts/schema"

export async function getCities() {
	try {
		const resp = await fetch(`${API_DOMAIN}/api/v1/cities`, {
			method: "GET",
			next: { revalidate: Time.toMs("4s") },
		})

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal("[getCities]", text)
			return []
		}

		const { success, data, error } = await cityItemSchema.array().safeParseAsync(json)

		if (!success) {
			logger.fail("[GetCitiesResponseParse]", json, error)
			return []
		}

		return data
	} catch (err) {
		logger.fatal("[GetCitiesCatch]", err)
		return []
	}
}

export const getDetailCity = async (citySlug: string) => {
	try {
		const resp = await fetch(`${API_DOMAIN}/api/v1/city/${citySlug}`, {
			method: "GET",
			next: { revalidate: Time.toMs("4s") },
		})

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal("[getDetailCity]", text)
			return
		}

		const { success, data, error } = await detailCitySchema.safeParseAsync(json)

		if (!success) {
			logger.fail("[getDetailCityResponseParse]", json, "\n", error)
			return
		}

		return data
	} catch (err) {
		logger.fatal("[GetCityCatch]", err)
	}
}
