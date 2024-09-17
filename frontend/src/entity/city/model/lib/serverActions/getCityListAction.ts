"use server"

import { createServerAction } from "zsa"
import { cityItemSchema } from "../../schema/schema"
import { getCities } from "../../../api/getCities"

export const getCityListAction = createServerAction()
	.output(cityItemSchema.pick({ id: true, name: true, slug: true, country: true }).array())
	.handler(async () => {
		const cities = await getCities()

		if ("code" in cities) {
			return []
		}

		return cities.map(({ id, name, slug, country }) => ({ id, name, slug, country }))
	})
