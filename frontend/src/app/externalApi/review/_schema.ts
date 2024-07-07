import { reviewSchema } from "@entity/review"
import { clientErrorResponseSchema } from "@share/api"
import { z } from "zod"

// Client

export const addReviewSchema = reviewSchema.pick({
	rating: true,
	text: true,
	user: true,
	tour: true,
})

const codes = z.enum(["UNAUTHORIZED", "INVALID_TOKEN", "INTERNAL_SERVER_ERROR"])

export const reviewResponseSchema = reviewSchema.or(clientErrorResponseSchema(codes))

export type AddReview = z.infer<typeof addReviewSchema>
export type ReviewResponse = z.infer<typeof reviewResponseSchema>

// API
