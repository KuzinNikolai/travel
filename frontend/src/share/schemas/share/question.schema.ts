import { z } from "zod"

const translateSchema = z.object({
	question: z.string(),
	answer: z.string(),
})

export const questionSchema = translateSchema.extend({
	id: z.number().int(),
	translations: z.record(translateSchema),
})

export type Question = z.infer<typeof questionSchema>
