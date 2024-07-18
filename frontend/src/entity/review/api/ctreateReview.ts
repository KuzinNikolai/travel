"use server"

import { serverErrorResponseSchema } from "@share/constants/schemes"
import { logger, SafeJson, Time } from "@share/lib"
import { isAuthorized } from "@share/serverActions"
import { z } from "zod"
import { ZSAError } from "zsa"
import { reviewSchema } from "../consts/schema"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"

const createReviewSchema = reviewSchema
	.omit({
		id: true,
		user: true,
		created_date: true,
	})
	.extend({ tourId: z.number() })

const responseSchema = reviewSchema.or(serverErrorResponseSchema)

export const createReview = isAuthorized
	.createServerAction()
	.input(createReviewSchema)
	.output(reviewSchema)
	.timeout(Time.toMs("20s"))
	.handler(async ({ input, ctx }) => {
		const { user, token } = ctx

		try {
			const resp = await fetch(`${API_DOMAIN}/api/v1/tours/add_review/${input.tourId}`, {
				method: "POST",
				headers: { Authorization: `Token ${token}` },
				body: SafeJson.stringify(Object.assign({}, input, { user: user.id })),
			})

			const text = await resp.text()

			const json = SafeJson.parse(text)

			if (!json) {
				logger.fail("[createReview]", text)
				throw new ZSAError("INPUT_PARSE_ERROR")
			}

			const { success, data, error } = await responseSchema.safeParseAsync(json)

			if (!success) {
				logger.fatal("[createReviewResponse]", error)
				throw new ZSAError("INTERNAL_SERVER_ERROR")
			}

			if ("detail" in data) {
				logger.debug("[createReviewResponseDetail]", data.detail)
				throw new ZSAError("ERROR")
			}

			return data
		} catch (e) {
			logger.fatal("[createReviewCatch]", e)
			throw new ZSAError("INTERNAL_SERVER_ERROR")
		}
	})
