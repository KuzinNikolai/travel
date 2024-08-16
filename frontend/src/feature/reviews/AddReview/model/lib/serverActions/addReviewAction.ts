"use server"

import { reviewSchema } from "@entity/review"
import { logger, Time } from "@share/lib"
import { isAuthorized } from "@share/serverActions"
import { z } from "zod"
import { ZSAError } from "zsa"
import { addReview } from "../../api/addReview"

const createReviewSchema = reviewSchema
	.omit({
		id: true,
		user: true,
		tour: true,
		user_full_name: true,
		created_date: true,
	})
	.extend({
		tourId: z.number(),
		user_full_name: z.string().optional(),
	})

export const addReviewAction = isAuthorized
	.createServerAction()
	.input(createReviewSchema)
	.output(reviewSchema)
	.timeout(Time.toMs("20s"))
	.handler(async ({ input, ctx }) => {
		const { user, token } = ctx

		try {
			const resp = await addReview(token, input.tourId, {
				tour: input.tourId,
				user: user.id,
				user_photo: user.photo,
				rating: input.rating,
				text: input.text,
				user_full_name: input.user_full_name || `${user.first_name} ${user.last_name}`,
			})

			if (!resp || "detail" in resp) {
				logger.fail("[addReview]", resp)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}

			// revalidateTag(queryKeyFactory.reviewListByTour(input.tourId)[1])

			return resp
		} catch (e) {
			logger.fatal("[createReviewCatch]", e)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}
	})
