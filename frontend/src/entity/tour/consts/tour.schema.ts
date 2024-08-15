import { reviewSchema } from "@entity/review"
import { tagSchema } from "@entity/tag"
import { z } from "zod"
import { infoItemSchema } from "./infoItem.schema"
import { programSchema } from "./program.schema"
import { questionSchema } from "./question.schema"

export enum PublishStatus {
	draft = 0,
	published = 1,
}

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
	tags: tagSchema.array(),
	min_price: z.number().nullable(),
	photo: z.string(),
	photos: z.string().array(),
	photo_alt: z.string(),
	average_rating: z.number(),
	currency_prefix: z.string(),
	is_published: z.nativeEnum(PublishStatus).optional(),
})

export const detailTourSchema = tourSchema.extend({
	meta_keywords: z.string().nullable(),

	lang: z.string().array(),
	transfer: z.string().array(),

	faqs: questionSchema.array(),
	programs: programSchema.array(),
	reviews: reviewSchema.array(),

	included: infoItemSchema.array(),
	notincluded: infoItemSchema.array(),
	take: infoItemSchema.array(),

	photos: z
		.object({
			id: z.number(),
			url: z.string(),
		})
		.array(),
	adult_price: z.number().nullable(),
	child_price: z.number().nullable(),
	children_possible: z.boolean(),
	what_age_child_free: z.number(),
	pregnant_possible: z.boolean(),
	usage_policy: z.string(),
	promotions: z.boolean(),
	author: z.number(),

	group_size: z.number().nullable(),

	time_create: z.string(),
	time_update: z.string().nullable(),
})

export type Tour = z.infer<typeof tourSchema>
export type DetailTour = z.infer<typeof detailTourSchema>
