import { detailTourSchema } from "@share/schemas"
import { z } from "zod"

export const editTourSchema = detailTourSchema
	.omit({
		id: true,
		type: true,
		country: true,
		country_slug: true,
		city: true,
		city_slug: true,
		category: true,

		tags: true,
		faqs: true,
		lang: true,
		included: true,
		notincluded: true,
		take: true,
		transfer: true,

		author: true,
		group_size: true,
		tour_link: true,
		average_rating: true,
		currency_prefix: true,
		duration: true,

		min_price: true,
		adult_price: true,
		child_price: true,
		pregnant_possible: true,
		children_possible: true,
		what_age_child_free: true,

		reviews: true,

		datetime_create: true,
		datetime_update: true,
	})
	.extend({
		tags: z.number().array(),
		faqs: z.number().array(),
		lang: z.number().array(),
		included: z.number().array(),
		notincluded: z.number().array(),
		take: z.number().array(),
		transfer: z.number().array(),

		user: z.number().int(),
	})

export type EditTour = z.infer<typeof editTourSchema>
