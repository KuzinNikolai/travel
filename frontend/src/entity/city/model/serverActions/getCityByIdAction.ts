"use server"

import { isErrorResponse } from "@share/packages/fetcher"
import { cityItemSchema } from "@share/schemas"
import { z } from "zod"
import { createServerAction } from "zsa"
import { getAllCities } from "../../api/getAllCities"

export const getCitiesByIdAction = createServerAction()
	.input(cityItemSchema.pick({ id: true }))
	.output(cityItemSchema.or(z.null()))
	.handler(async ({ input }) => {
		const cities = await getAllCities()

		if (isErrorResponse(cities)) {
			return null
		}

		const filter = cities.filter((city) => city.id === input.id)
		return filter[0] || null
	})
