import { logger, SafeJson } from "@share/lib"
import { detailTourSchema, tourSchema } from "../consts"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"

export async function getTours() {
	const resp = await fetch(`${API_DOMAIN}/api/v1/tours/`, { method: "GET" })

	if (!resp.ok) {
		return []
	}

	const toursJson = await resp.json()
	const { success, data, error } = await tourSchema.array().safeParseAsync(toursJson)

	if (!success) {
		logger.fail("[GET TOURS] Invalid response", error)
		return []
	}

	return data
}

export async function getDetailTour(tourSlug: string) {
	const resp = await fetch(`${API_DOMAIN}/api/v1/tours/${tourSlug}`, { method: "GET" })

	if (!resp.ok) {
		return null
	}

	const text = await resp.text()
	const json = SafeJson.parse(text)

	if (!json) {
		logger.fatal("[GET DETAIL TOUR] Invalid response", text)		
		return null
	}

	const { success, data, error } = await detailTourSchema.safeParseAsync(json)

	if (!success) {
		logger.fail("[GET DETAIL TOUR] Invalid response", error)
		return null
	}

	return data
}
