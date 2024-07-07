import { tourSchema } from "@entity/tour"
import { z } from "zod"

export const citySchema = z.object({
	id: z.number(),
	name: z.string(),
	title: z.string(),
	slug: z.string(),
	description: z.string(),
	photo: z.string(),
})

export const cityItemSchema = z.object({
	...citySchema.shape,

	photo_alt: z.string(),
	tour_count: z.number(),
	popular_tours: z.array(tourSchema),
})

export const detailCitySchema = z.object({
	...citySchema.shape,

	tour_count: z.number(),
	tours: z.array(tourSchema),
})

export type City = z.infer<typeof citySchema>
export type CityItem = z.infer<typeof cityItemSchema>
export type DetailCity = z.infer<typeof detailCitySchema>
