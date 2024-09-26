import { z } from "zod"
import { dateTimeSchema } from "./share"

const metaSchema = z.object({
	id: z.number(),
	created_date: dateTimeSchema,
})

const translateSchema = z.object({
	text: z.string().nullable(),
})

const authorDataSchema = z.object({
	user: z.number(),
	user_full_name: z.string(),
	user_photo: z.string().nullable(),
})

export const reviewSchema = metaSchema
	.merge(translateSchema)
	.merge(authorDataSchema)
	.merge(
		z.object({
			rating: z.number(),
			tour: z.number(),
			translations: z.record(translateSchema),
		}),
	)
	.strict()

export type Review = z.infer<typeof reviewSchema>
