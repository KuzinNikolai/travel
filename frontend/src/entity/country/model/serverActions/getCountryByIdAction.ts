"use server"

import { countryItemSchema } from "@share/schemas"
import { z } from "zod"
import { createServerAction } from "zsa"
import { getCountries } from "../../api/getCountries"

export const getCountryByIdAction = createServerAction()
	.input(countryItemSchema.pick({ id: true }))
	.output(countryItemSchema.or(z.null()))
	.handler(async ({ input }) => {
		const cities = await getCountries()

		if ("code" in cities) {
			return null
		}

		return cities.filter((city) => city.id === input.id).at(0) || null
	})
