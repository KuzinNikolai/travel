import { z } from "zod"

const translateSchema = z.object({
	photo_alt: z.string().nullable(),
})

export const photoSchema = translateSchema.extend({
	id: z.number(),
	image: z.string(),
	create_date_time: z.string().datetime(),
	translations: z.record(translateSchema),
})

export type Photo = z.infer<typeof photoSchema>
