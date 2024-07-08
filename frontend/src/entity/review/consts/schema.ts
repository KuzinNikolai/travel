import { dateTimeSchema } from "@share/constants/schemes/dateTime.schema"
import { z } from "zod"

export const reviewSchema = z.object({
	id: z.number(),
	rating: z.number(),
	user_full_name: z.string(),
	user: z.number(),
	tour: z.number(),
	text: z.string(),
	created_date: dateTimeSchema,
})

export type Review = z.infer<typeof reviewSchema>
