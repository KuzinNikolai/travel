import { detailTourSchema, tourSchema } from "@entity/tour"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { logger, SafeJson, Time } from "@share/lib"
import { countrySchema, detailCountrySchema } from "../consts/schema"

export async function getCountries() {
	try {
		const resp = await fetch(`${API_DOMAIN}/api/v1/countries/`, {
			method: "GET",
			next: { revalidate: Time.toMs("4s") },
		})

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal("[getCountries]", text)
			return []
		}

		const { success, data, error } = await countrySchema.array().safeParseAsync(json)

		if (!success) {
			logger.fail("[GetCountriesResponseParse]", json, error)
			return []
		}

		return data
	} catch (err) {
		logger.fatal("[GetCountriesCatch]", err)
		return []
	}
}

export const getDetailCountry = async (countrySlug: string) => {
	try {
		const resp = await fetch(`${API_DOMAIN}/api/v1/country/${countrySlug}`, {
			method: "GET",
			next: { revalidate: Time.toMs("4s") },
		})

		const text = await resp.text()
		const json = SafeJson.parse(text)

		if (!json) {
			logger.fatal("[getDetailCountry]", text)
			return
		}

		const { success, data, error } = await detailCountrySchema.safeParseAsync(json)

		if (!success) {
			logger.fail("[getDetailCountryResponseParse]", json, "\n", error)
			return
		}

		return data
	} catch (err) {
		logger.fatal("[GetDetailCountryCatch]", err)
	}
}
