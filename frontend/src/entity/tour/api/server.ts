import { API_DOMAIN } from "@share/api"
import { logger } from "@share/lib"
import { detailTourSchema, tourSchema } from "../consts"

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

	const tourJson = await resp.json()
	const { success, data, error } = await detailTourSchema.safeParseAsync(tourJson)

	if (!success) {
		logger.fail("[GET DETAIL TOUR] Invalid response", error)
		return null
	}

	return data
}
