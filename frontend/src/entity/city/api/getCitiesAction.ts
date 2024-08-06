"use server"

import { createServerAction } from "zsa"
import { cityItemSchema } from "../consts/schema"
import { getCities } from "./server"

export const getCitiesAction = createServerAction()
	.output(cityItemSchema.array())
	.handler(async () => await getCities())
