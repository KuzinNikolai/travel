import { z } from "zod"
import { tourSchema } from "./tour.schema"

export const citySchema = z.object({
	id: z.number(),
	name: z.string(),
	title: z.string(),
	slug: z.string(),
	// meta_desc: z.string(),
	description: z.string(),
	photo: z.string(),
})

export type ICity = z.infer<typeof citySchema>

export const cityItemSchema = z.object({
	...citySchema.shape,

	photo_alt: z.string(),
	tour_count: z.number(),
	popular_tours: z.array(tourSchema),
})

export type ICityItem = z.infer<typeof cityItemSchema>

export const detailCitySchema = z.object({
	...citySchema.shape,

	tour_count: z.number(),
	tours: z.array(tourSchema),
})

export type IDetailCity = z.infer<typeof detailCitySchema>
