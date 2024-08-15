import { logger, SafeJson } from "@share/lib"
import { detailTourSchema, tourSchema } from "../consts"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"

export async function getTours() {
	try {
		const resp = await fetch(`${API_DOMAIN}/api/v1/tours/`, { method: "GET" })
	
		if (!resp.ok) {
			return []
		}
	
		const text = await resp.text()
		const toursJson = SafeJson.parse(text)

		if (!toursJson) {
			logger.fatal("[getTours - parse]", text)
			return []
		}

		const { success, data, error } = await tourSchema.array().safeParseAsync(toursJson)
	
		if (!success) {
			logger.fail("[getTours - validation]", error)
			return []
		}
	
		return data
	} catch (err) {
		logger.fatal("[getTours - catch]", err)
		return []
	}
}

export async function getDetailTour(tourSlug: string) {
	const resp = await fetch(`${API_DOMAIN}/api/v1/tours/${tourSlug}`, { method: "GET" })

	if (!resp.ok) {
		return null
	}

	const text = await resp.text()
	const json = SafeJson.parse(text)

	if (!json) {
		logger.fatal("[getDetailTour - parse]", text)
		return null
	}

	const { success, data, error } = await detailTourSchema.safeParseAsync(json)

	if (!success) {
		logger.fail("[getDetailTour - validation]", json, error)
		return null
	}

	return data
}
