import { reviewSchema } from "@entity/review";
import type { Tour } from "@entity/tour";
import { generateHeader } from "@share/api";
import { API_DOMAIN } from "@share/constants/API_DOMAIN";
import { serverErrorResponseSchema } from "@share/constants/schemes";
import { SafeJson, logger } from "@share/lib";
import type { AddReviewData } from "../schema";

export async function addReview(
	userToken: string,
	tourId: Tour["id"],
	review: AddReviewData,
) {
	try {
		const resp = await fetch(
			`${API_DOMAIN}/api/v1/tours/add_review/${tourId}`,
			{
				method: "POST",
				headers: generateHeader(userToken),
				body: JSON.stringify({
					...review,
					created_date: review.created_date.toISOString(),
				} satisfies Omit<AddReviewData, "created_date"> & {
					created_date: string;
				}),
			},
		);

		const text = await resp.text();
		const json = SafeJson.parse(text);

		if (!json) {
			logger.fatal("[addReview-parse]", text);
			return;
		}

		const { success, data, error } = await reviewSchema
			.or(serverErrorResponseSchema)
			.safeParseAsync(json);

		if (!success) {
			logger.fatal("[addReview-validation]", json, error);
			return;
		}

		return data;
	} catch (err) {
		console.error("addReview-catch", err);
	}
}
