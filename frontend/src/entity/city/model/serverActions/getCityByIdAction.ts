"use server"

import { z } from "zod"
import { createServerAction } from "zsa"
import { getAllCities } from "../../api/getAllCities"
import { cityItemSchema } from "@share/schemas"

export const getCitiesByIdAction = createServerAction()
	.input(cityItemSchema.pick({ id: true }))
	.output(cityItemSchema.or(z.null()))
	.handler(async ({ input }) => {
		const cities = await getAllCities()

		if ("code" in cities) {
			return null
		}

		const filter = cities.filter((city) => city.id === input.id)
		return filter[0] || null
	})
