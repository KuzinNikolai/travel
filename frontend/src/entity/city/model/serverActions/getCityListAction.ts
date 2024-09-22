"use server"

import { cityItemSchema } from "@share/schemas"
import { createServerAction } from "zsa"
import { getAllCities } from "../../api/getAllCities"

export const getCityListAction = createServerAction()
	.output(cityItemSchema.pick({ id: true, name: true, slug: true, country: true }).array())
	.handler(async () => {
		const cities = await getAllCities()

		if ("code" in cities) {
			return []
		}

		return cities.map(({ id, name, slug, country }) => ({ id, name, slug, country }))
	})
