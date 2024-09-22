"use server"

import { countryItemSchema } from "@share/schemas"
import { createServerAction } from "zsa"
import { getCountries } from "../../api/getCountries"

export const getCountryListAction = createServerAction()
	.output(
		countryItemSchema
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
