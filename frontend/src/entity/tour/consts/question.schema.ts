import { z } from "zod"

export const questionSchema = z.object({
	question: z.string(),
	answer: z.string(),
})

export type Question = z.infer<typeof questionSchema>
