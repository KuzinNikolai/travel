"use server"

import { z } from "zod"
import { createServerAction } from "zsa"
import { cityItemSchema } from "../../schema/schema"
import { getCities } from "../../../api/getCities"

export const getCitiesByIdAction = createServerAction()
	.input(cityItemSchema.pick({ id: true }))
	.output(cityItemSchema.or(z.null()))
	.handler(async ({ input }) => {
		const cities = await getCities()

		if ("code" in cities) {
			return null
		}

		const filter = cities.filter((city) => city.id === input.id)
		return filter[0] || null
	})
