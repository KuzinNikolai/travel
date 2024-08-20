import { reviewSchema } from "@entity/review";
import type { z } from "zod";

export const addReviewDataSchema = reviewSchema.omit({
	id: true,
});

export type AddReviewData = z.infer<typeof addReviewDataSchema>;
