import { IDetailTour, ITour } from "@/entities/travel/Tour.entity";
import { z } from "zod";
import { questionSchema } from "../question.schema";
import { reviewSchema } from "../review";
import { infoItemSchema } from "./infoItem.schema";
import { programSchema } from "./program.schema";
import { tagSchema } from "./tag.schema";

export const tourSchema = z.object({
  id: z.number(),
  slug: z.string(),
  country: z.string(),
  country_slug: z.string(),
  city: z.string(),
  city_slug: z.string(),

  title: z.string(),
  meta_desc: z.string(),
  description: z.string(),

  duration: z.string(),
  type: z.string(),
  cat: z.string(),
  tags: z.array(tagSchema),
  min_price: z.number(),
  photo: z.string(),
  photo_alt: z.string(),
  average_rating: z.number(),
  currency_prefix: z.string(),
}) satisfies z.ZodType<ITour>;

export const detailTourSchema = z.object({
  ...tourSchema.shape,

  meta_keywords: z.string(),

  lang: z.array(z.string()),
  transfer: z.array(z.string()),

  faqs: z.array(questionSchema),
  programs: z.array(programSchema),
  reviews: z.array(reviewSchema),

  included: z.array(infoItemSchema),
  notincluded: z.array(infoItemSchema),
  take: z.array(infoItemSchema),

  photos: z.array(z.string()),
  adult_price: z.number().nullable(),
  child_price: z.number().nullable(),
  children_possible: z.boolean(),
  what_age_child_free: z.number(),
  pregnant_possible: z.boolean(),
  usage_policy: z.string(),
  promotions: z.boolean(),
  author: z.number(),

  time_create: z.string(),
  time_update: z.string().nullable(),
}) satisfies z.ZodType<IDetailTour>;
