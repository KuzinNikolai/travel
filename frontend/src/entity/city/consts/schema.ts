import { tourSchema } from "@entity/tour"
import { z } from "zod"

const citySchema = z.object({
	id: z.number(),
	name: z.string(),
	title: z.string(),
	slug: z.string(),
	description: z.string(),
	photo: z.string(),
	photo_alt: z.string(),
	tour_count: z.number(),
})

export const cityItemSchema = citySchema.extend({
	meta_desc: z.string(),
	country: z.string(),
	popular_tours: tourSchema.array(),
})

export const detailCitySchema = citySchema.extend({ tours: tourSchema.array() })

export type CityItem = z.infer<typeof cityItemSchema>
export type DetailCity = z.infer<typeof detailCitySchema>
