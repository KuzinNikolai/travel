"use server"

import { createServerAction } from "zsa"
import { cityItemSchema } from "../consts/schema"
import { getCities } from "./server"

export const getCityListAction = createServerAction()
	.output(cityItemSchema.pick({ id: true, name: true, slug: true, country: true }).array())
	.handler(async () => (await getCities()).map(({ id, name, slug, country }) => ({ id, name, slug, country })))
