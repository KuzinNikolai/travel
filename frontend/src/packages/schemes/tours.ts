import { IDetailTour, ITag, ITour } from "@/entities/travel";
import { z } from "zod";
import { questionSchema } from "./question";
import { reviewSchema } from "./review";

export const tagSchema = z.object({
  tag: z.string(),
  slug: z.string(),
  active_image: z.string(),
  inactive_image: z.string(),
}) satisfies z.ZodType<ITag>;

export const tourSchema = z.object({
  id: z.number(),
  country: z.string(),
  city: z.string(),
  title: z.string(),
  meta_desc: z.string(),
  description: z.string(),
  duration: z.string(),
  type: z.string(),
  slug: z.string(),
  cat: z.string(),
  tags: z.array(tagSchema),
  min_price: z.number().nullable(),
  photo: z.string(),
  average_rating: z.number(),
  currency_prefix: z.string(),
}) satisfies z.ZodType<ITour>;

export const arrToursSchema = z.array(tourSchema) satisfies z.ZodType<ITour[]>;

export const detailTourSchema = z.object({
  ...tourSchema.shape,
  tag: z.string(),
  active_image: z.string(),
  inactive_image: z.string().nullable(),
  currency_prefix: z.string(),
  lang: z.array(z.string()),
  transfer: z.array(z.string()),
  faqs: z.array(questionSchema),
  programs: z.array(z.string()),
  includedL: z.array(z.string()),
  notincluded: z.array(z.string()),
  take: z.array(z.string()),
  included: z.array(z.string()),
  reviews: z.array(reviewSchema),
  photos: z.array(z.string()),
  meta_keywords: z.string(),
  adult_price: z.number(),
  child_price: z.number(),
  children_possible: z.boolean(),
  what_age_child_free: z.number(),
  pregnant_possible: z.boolean(),
  usage_policy: z.string(),
  time_create: z.string(),
  time_update: z.string().nullable(),
  promotions: z.number(),
  author: z.number(),
}) satisfies z.ZodType<IDetailTour>;
