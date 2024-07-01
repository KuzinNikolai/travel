import type { IQuestion } from "@/entities/question.entity"
import { z } from "zod"

export const questionSchema = z.object({
	question: z.string(),
	answer: z.string(),
}) satisfies z.ZodType<IQuestion>
