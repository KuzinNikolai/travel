import { IReview } from "@/entities/review.entity";
import { z } from "zod";
import { dateTimeSchema } from "./dateTimeSchema";

export const reviewSchema = z.object({
  id: z.number(),
  tour_id: z.number(),
  user_id: z.number(),
  comment: z.string(),
  rating: z.number(),
  user_full_name: z.string(),
  user: z.number(),
  tour: z.number(),
  text: z.string(),
  created_date: dateTimeSchema,
}) satisfies z.ZodType<IReview>;
