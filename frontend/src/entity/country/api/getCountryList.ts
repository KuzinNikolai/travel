"use server"

import { createServerAction } from "zsa"
import { countrySchema } from "../consts/schema"
import { getCountries } from "./server"

export const getCountryListAction = createServerAction()
	.output(
		countrySchema
			.pick({
				id: true,
				name: true,
				slug: true,
			})
			.array(),
	)
	.handler(async () => (await getCountries()).map(({ id, name, slug }) => ({ id, name, slug })))
