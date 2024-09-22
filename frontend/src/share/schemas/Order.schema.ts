import { z } from "zod"
import { dateTimeSchema } from "./share"
import { userSchema } from "./User.schema"

export const orderSchema = z
	.object({
		id: z.number(),
		order_number: z.string(),

		country_name: z.string(),
		city_name: z.string(),
		
		tour: z.number(),
		tour_title: z.string(),

		program: z.number(),
		program_title: z.string(),

		hotel: z.string(),
		room_number: z.string().nullable(),

		pickup_time: dateTimeSchema.nullable(),
		trip_date: dateTimeSchema.nullable(),

		full_name: z.string(),
		user: z.number(),

		text: z.string().nullable(),

		quantity_adults: z.number(),
		quantity_children: z.number(),
		quantity_infant: z.number(),

		total_price: z.number(),

		manager: z.string(),
		manager_phone: z.string().nullable(),
		manager_email: z.string(),

		transfer: z.number(),
		deposit: z.number(),
		cash_on_tour: z.number(),
	})
	.merge(
		userSchema.pick({
			email: true,
			phone: true,
		}),
	)

export type Order = z.infer<typeof orderSchema>