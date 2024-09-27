import { z } from "zod"
import { popularTourSchema, tourSchema } from "./Tours.schema"

const metaSchema = z.object({
	id: z.number().int(),
	slug: z.string(),
	name: z.string(),
})

const translateSchema = z.object({
	title: z.string(),
	meta_desc: z.string(),
	description: z.string(),
	photo_alt: z.string(),
})

export const cityItemSchema = metaSchema
	.extend({
		photo: z.string(),
		tour_count: z.number(),
		country: z.string(),
		popular_tours: z.array(popularTourSchema),
	})
	.merge(translateSchema)
	.strict()

export const detailCitySchema = metaSchema
	.extend({
		photo: z.string(),
		photo_alt: z.string(),
		tour_count: z.number(),
		country: z.string(),
		tours: z.array(tourSchema),
	})
	.merge(translateSchema)
	.strict()

export type CityItem = z.infer<typeof cityItemSchema>
export type DetailCity = z.infer<typeof detailCitySchema>
