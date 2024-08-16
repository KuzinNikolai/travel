"use server"

import { z } from "zod"
import { createServerAction } from "zsa"
import { getTourReviews } from "../../api/getTourReviews"
import { reviewSchema } from "../../schema/schema"

const getAllTourReviewsInputSchema = z.object({ tourId: z.number() })

export const getAllTourReviews = createServerAction()
	.input(getAllTourReviewsInputSchema)
	.output(reviewSchema.array())
	.handler(async ({ input }) => {
		const { tourId } = input

		const resp = await getTourReviews(tourId)

		if (!resp) {
			return []
		}

		return resp
	})
