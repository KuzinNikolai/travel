import { tourSchema } from "@share/schemas"
import { z } from "zod"

const translateSchema = tourSchema.shape.translations.valueSchema.pick({ title: true })

export const createTourSchema = tourSchema
	.pick({
		title: true,
		slug: true,
		duration: true,
	})
	.extend({
		type: z.number().int(),
		user: z.number().int(),
		country: z.number().int(),
		city: z.number().int(),
		photos: z.array(z.string()),
		category_id: z.number(),
		translations: z.record(translateSchema),
	})

export type CreateTour = z.infer<typeof createTourSchema>
