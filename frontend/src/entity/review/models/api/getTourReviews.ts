import { API_DOMAIN } from "@share/constants/API_DOMAIN";
import { SafeJson, logger } from "@share/lib";
import { reviewSchema } from "../schema/schema";

export async function getTourReviews(tourId: number) {
	try {
		const resp = await fetch(`${API_DOMAIN}/api/v1/tours/${tourId}/reviews`, {
			method: "GET",
		});

		const text = await resp.text();
		const json = SafeJson.parse(text);

		if (!json) {
			logger.fail("[getTourReviews-parse]", text);
		}

		const { success, data, error } = await reviewSchema
			.array()
			.safeParseAsync(json);

		if (!success) {
			logger.fail("[getTourReviews-validation]", json, error);
		}

		return data;
	} catch (e) {
		console.error("[getTourReviews-catch]", e);
	}
}