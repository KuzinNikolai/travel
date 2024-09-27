import { reviewSchema } from "@share/schemas"
import type { z } from "zod"

export const addReviewDataSchema = reviewSchema.omit({ id: true })

export type AddReviewData = z.infer<typeof addReviewDataSchema>
