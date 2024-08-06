"use server"

import { createServerAction } from "zsa"
import { countrySchema } from "../consts/schema"
import { getCountries } from "./server"

export const getCountriesAction = createServerAction()
	.output(countrySchema.array())
	.handler(async () => await getCountries())
