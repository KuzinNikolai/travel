"use server"

import { z } from "zod"
import { createServerAction } from "zsa"
import { getCountries } from "../../../api/getCountries"
import { countrySchema } from "../../../consts/schema"

export const getCountryByIdAction = createServerAction()
	.input(countrySchema.pick({ id: true }))
	.output(countrySchema.or(z.null()))
	.handler(async ({ input }) => {
		const cities = await getCountries()

		if ("code" in cities) {
			return null
		}

		return cities.filter((city) => city.id === input.id).at(0) || null
	})
