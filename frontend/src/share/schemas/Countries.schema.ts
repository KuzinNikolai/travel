import { z } from "zod"
import { cityItemSchema } from "./Cities.schema"

const metaSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	slug: z.string(),
})

export const countryItemSchema = metaSchema.extend({
	title: z.string(),
	description: z.string(),
	photo: z.string(),
	tour_count: z.number(),
	cities: z.array(cityItemSchema),
})

export const detailCountrySchema = metaSchema.extend({
	title: z.string(),
	description: z.string(),
})

export type CountryItem = z.infer<typeof countryItemSchema>
export type DetailCountry = z.infer<typeof detailCountrySchema>
