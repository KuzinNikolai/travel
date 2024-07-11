import { z } from "zod"

export const orderSchema = z.object({
	id: z.number(),
	order_number: z.string().nullable(),

	tour: z.number(),
	tour_title: z.string(),
	program_title: z.string(),
	program: z.number(),

	country_name: z.string().nullable(),
	city_name: z.string().nullable(),
	hotel: z.string().nullable(),
	room_number: z.string().nullable(),

	full_name: z.string(),
	email: z.string().email(),
	phone: z.string(),
	user: z.number(),
	text: z.string().nullable(),

	quantity_adults: z.number(),
	quantity_children: z.number(),
	quantity_infant: z.number(),

	manager: z.string(),
	manager_phone: z.string().nullable(),
	manager_email: z.string().email().nullable(),

	total_price: z.number(),
	transfer: z.number(),
	deposit: z.number(),
	cash_on_tour: z.number(),

	trip_date: z.string().or(z.date()).nullable(),
})

export const formCreateOrderSchema = orderSchema.pick({
	program: true,
	tour: true,

	full_name: true,
	phone: true,

	hotel: true,
	room_number: true,

	quantity_adults: true,
	quantity_children: true,
	quantity_infant: true,

	trip_date: true,

	text: true,
})

export const createOrderSchema = formCreateOrderSchema.merge(
	orderSchema.pick({
		email: true,
		user: true,
	}),
)

export type Order = z.infer<typeof orderSchema>
export type FormCreateOrder = z.infer<typeof formCreateOrderSchema>
export type CreateOrder = z.infer<typeof createOrderSchema>
