import { z } from "zod"

const translateSchema = z.object({
	tag: z.string(),
})

export const tagSchema = translateSchema.extend({
	slug: z.string(),
	translations: z.record(translateSchema),
})
