import { dateTimeSchema } from "@/entities/dateTimeSchema";
import { IReview } from "@/entities/review";
import { z } from "zod";

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
