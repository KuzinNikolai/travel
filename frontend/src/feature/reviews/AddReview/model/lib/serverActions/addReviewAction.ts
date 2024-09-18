"use server"

import { reviewSchema } from "@entity/review"
import { isAuthorized } from "@share/packages/auth"
import { print } from "@share/packages/logger"
import { z } from "zod"
import { ZSAError } from "zsa"
import { addReview } from "../../api/addReview"

const createReviewSchema = reviewSchema
	.omit({
		id: true,
		user: true,
		user_full_name: true,
	})
	.extend({
		user_full_name: z.string().optional(),
	})

export const addReviewAction = isAuthorized
	.createServerAction()
	.input(createReviewSchema)
	.output(reviewSchema)
	.handler(async ({ input, ctx }) => {
		const { user, token } = ctx

		const resp = await addReview(token, input.tour, {
			tour: input.tour,
			user: user.id,
			user_photo: user.photo,
			rating: input.rating,
			text: input.text,
			user_full_name: input.user_full_name || `${user.first_name} ${user.last_name}`,
			created_date: input.created_date || new Date(),
			translations: input.translations,
		})

		if (!resp || "detail" in resp) {
			print.fail("[addReviewAction - response]", resp)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}

		return resp
	})
