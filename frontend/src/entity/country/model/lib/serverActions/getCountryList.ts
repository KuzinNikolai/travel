"use server"

import { createServerAction } from "zsa"
import { countrySchema } from "../../../consts/schema"
import { getCountries } from "../../../api/getCountries"

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
	.handler(async () => {
		const countries = await getCountries()

		if ("code" in countries) {
			return []
		}

		return countries.map(({ id, name, slug }) => ({ id, name, slug }))
	})
