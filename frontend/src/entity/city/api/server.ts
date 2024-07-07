import { serverFetchApi } from "@share/api"
import { cityItemSchema, detailCitySchema } from "../consts/schema"

export async function getCities() {
	const cities = await serverFetchApi("cities", "GET", {
		next: { revalidate: 600 },
		schema: cityItemSchema.array(),
	})

	if (!cities.ok || "code" in cities || !cities.schemaParsed) {
		return []
	}

	return cities.data
}

export const getDetailCity = async (citySlug: string) => {
	const resp = await serverFetchApi(`city/${citySlug}`, "GET", {
		schema: detailCitySchema,
		next: { revalidate: 600 },
	})

	if (!resp.ok || "code" in resp || !resp.schemaParsed) {
		return null
	}

	return resp.data
}
