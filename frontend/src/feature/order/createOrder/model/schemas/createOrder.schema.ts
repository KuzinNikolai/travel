import { orderSchema } from "@entity/order"
import { dateToDateTimeSchema } from "@share/constants/schemes"
import type { z } from "zod"

export const createOrderSchema = orderSchema
	.pick({
		program: true,
		tour: true,
		hotel: true,
		room_number: true,
		full_name: true,
		email: true,
		phone: true,
		user: true,
		text: true,
		quantity_adults: true,
		quantity_children: true,
		quantity_infant: true,
		trip_date: true,
	})

export type CreateOrder = z.infer<typeof createOrderSchema>
