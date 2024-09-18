import { reviewSchema } from "@entity/review"
import type { Tour } from "@entity/tour"
import { API_DOMAIN } from "@share/constants/API_DOMAIN"
import { baseErrorResponseSchema, fetcher } from "@share/packages/fetcher"
import { print } from "@share/packages/logger"
import { safeApi } from "@share/packages/safeApi"
import type { AddReviewData } from "../schema"

export async function addReview(userToken: string, tourId: Tour["id"], review: AddReviewData) {
	const resp = await fetcher(`${API_DOMAIN}/api/v1/tours/add_review/${tourId}`, {
		method: "POST",
		token: userToken,
		body: JSON.stringify({
			...review,
			created_date: review.created_date.toISOString(),
		} satisfies Omit<AddReviewData, "created_date"> & {
			created_date: string
		}),
	})

	if (!resp) {
		return
	}

	try {
		const text = await resp.text()
		const json = safeApi.json.parse(text)

		if (!json) {
			print.fatal("[addReview-parse]", text)
			return
		}

		const { success, data, error } = await reviewSchema.or(baseErrorResponseSchema).safeParseAsync(json)

		if (!success) {
			print.fatal("[addReview-validation]", json, error)
			return
		}

		return data
	} catch (err) {
		console.error("addReview-catch", err)
	}
}
