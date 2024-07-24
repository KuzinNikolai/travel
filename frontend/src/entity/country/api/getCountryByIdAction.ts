"use server"

import { z } from "zod"
import { createServerAction } from "zsa"
import { countrySchema } from "../consts/schema"
import { getCountries } from "./server"

export const getCountryByIdAction = createServerAction()
	.input(countrySchema.pick({ id: true }))
	.output(countrySchema.or(z.null()))
	.handler(async ({ input }) => {
		const cities = await getCountries()
		const filter = cities.filter((city) => city.id === input.id)
		return filter[0] || null
	})
