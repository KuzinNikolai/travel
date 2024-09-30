import { z } from "zod"
import { PublishedStepsEnum } from "./Enums"
import { reviewSchema } from "./Review.schema"
import { infoItemSchema } from "./share/infoItem.schema"
import { photoSchema } from "./share/photo.schema"
import { programSchema } from "./share/program.schema"
import { questionSchema } from "./share/question.schema"
import { tagSchema } from "./share/tag.schema"
import { authorSchema } from "./User.schema"
import { durationSchema } from "./share"

const metaSchema = z.object({
	id: z.number().int(),
	slug: z.string(),

	average_rating: z.number().min(0).max(5),
	currency_prefix: z.string(),

	datetime_create: z.string().datetime(),
	datetime_update: z.string().datetime(),
})

const translateSchema = z.object({
	title: z.string().min(4).max(120),
	description: z.string().min(10).max(2000),
	meta_desc: z.string().min(10).max(600),
	meta_keywords: z.string().min(4).max(90).nullable(),
})

export const tourSchema = metaSchema
	.merge(translateSchema)
	.merge(
		z.object({
			country: z.string(),
			country_slug: z.string(),
			city: z.string(),
			city_slug: z.string(),

			duration: durationSchema,

			category: z.string(),
			tags: tagSchema.array(),
			lang: z.array(z.string()),

			promotions: z.boolean(),
			min_price: z.number().nullable(),
			min_price_with_promotions: z.number().nullable(),

			photo: z.string().url(),
			photo_alt: z.string(),

			is_published: z.nativeEnum(PublishedStepsEnum),

			author: authorSchema,

			translations: z.record(translateSchema.extend({ photo_alt: z.string() })),
		}),
	)
	.strict()

export const popularTourSchema = metaSchema
	.merge(translateSchema)
	.merge(
		z.object({
			country: z.string(),
			country_slug: z.string(),
			city: z.string(),
			city_slug: z.string(),
			duration: durationSchema,

			category: z.string(),
			tags: tagSchema.array(),
			lang: z.array(z.string()),

			promotions: z.boolean(),
			min_price: z.number().nullable(),
			min_price_with_promotions: z.number().nullable(),

			photo: z.string().url(),
			photo_alt: z.string(),

			is_published: z.nativeEnum(PublishedStepsEnum),

			author: authorSchema,

			translations: z.record(translateSchema.extend({ photo_alt: z.string() })),
		}),
	)
	.strict()

export const detailTourSchema = metaSchema
	.merge(translateSchema)
	.merge(
		z.object({
			country: z.string(),
			country_slug: z.string(),
			city: z.string(),
			city_slug: z.string(),

			duration: z.number().nullable(),

			included: infoItemSchema.array(),
			notincluded: infoItemSchema.array(),
			take: infoItemSchema.array(),

			adult_price: z.number().nullable(),
			child_price: z.number().nullable(),
			children_possible: z.boolean(),
			what_age_child_free: z.number(),
			pregnant_possible: z.boolean(),

			photo: z.string().url(),
			photo_alt: z.string(),

			datetime_create: z.string().datetime(),
			datetime_update: z.string().datetime(),

			category: z.string(),
			type: z.string(),
			transfer: infoItemSchema.array(),
			tags: tagSchema.array(),
			lang: z.array(z.string()),
			faqs: questionSchema.array(),
			group_size: z.number().nullable(),
			promotions: z.boolean(),
			author: z.number().int(),

			programs: programSchema.array(),

			reviews: reviewSchema.array(),
			tour_link: z.string().url(),
			photos: photoSchema.array(),
			min_price: z.number().nullable(),
		}),
	)
	.strict()

export const supplierOffer = metaSchema
	.merge(translateSchema)
	.merge(
		z.object({
			country: z.string(),
			country_slug: z.string(),
			city: z.string(),
			city_slug: z.string(),
			category: z.string(),
			author: z.number(),

			photo_alt: z.string(),
			photo: z.string().nullable(),
			included: z.array(z.number()),
			notincluded: z.array(z.number()),
			take: z.array(z.number()),
			transfer: z.array(z.number()),
			tags: z.array(z.number()),
			lang: z.array(z.number()),
			faqs: z.array(z.number()),
			programs: z.array(programSchema),
			
			type: z.string(),
			adult_price: z.number().nullable(),
			child_price: z.number().nullable(),
			children_possible: z.boolean(),
			what_age_child_free: z.number().nullable(),
			pregnant_possible: z.boolean(),
			group_size: z.number().nullable(),
			promotions: z.boolean(),
			
			reviews: reviewSchema.array(),
			tour_link: z.string().url(),
			photos: z.array(z.string()),
			min_price: z.number().nullable(),

			datetime_create: z.string().datetime(),
			datetime_update: z.string().datetime().nullable(),
		}),
	)
	.strict()

export type Tour = z.infer<typeof tourSchema>
export type PopularTour = z.infer<typeof popularTourSchema>
export type DetailTour = z.infer<typeof detailTourSchema>
export type SupplierOffer = z.infer<typeof supplierOffer>
