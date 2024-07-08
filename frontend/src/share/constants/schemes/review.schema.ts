import { z } from "zod"
import { dateTimeSchema } from "./dateTime.schema"

export const reviewSchema = z.object({
	id: z.number(),
	rating: z.number(),
	user_full_name: z.string(),
	user: z.number(),
	tour: z.number(),
	text: z.string(),
	created_date: dateTimeSchema,
})
