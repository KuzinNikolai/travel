import { cityItemSchema } from "@entity/city"
import { tourSchema } from "@entity/tour"
import { z } from "zod"

const cityShortSchema = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
})

export const countrySchema = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
	title: z.string(),
	description: z.string(),
	photo: z.string(),
	tour_count: z.number(),
	cities: cityShortSchema.array(),
})

export const detailCountrySchema = countrySchema
	.omit({
		photo: true,
		tour_count: true,
		cities: true,
	})
	.extend({ cities: cityItemSchema.array() })

export type CountryItem = z.infer<typeof countrySchema>
export type DetailCountry = z.infer<typeof detailCountrySchema>