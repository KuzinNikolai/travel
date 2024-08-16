import { dateTimeSchema } from "@share/constants/schemes/dateTime.schema"
import { z } from "zod"

export const reviewSchema = z.object({
	id: z.number(),
	rating: z.number(),
	user_full_name: z.string(),
	user: z.number(),
	user_photo: z.string(),
	tour: z.number(),
	text: z.string().nullable(),
	created_date: dateTimeSchema,
	translations: z.record(z.object({ text: z.string() })).optional(),
})

export type Review = z.infer<typeof reviewSchema>
