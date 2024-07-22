import { z } from "zod"

export const userSchema = z.object({
	id: z.number(),
	email: z.string().email(),
	username: z.string(),

	first_name: z.string(),
	last_name: z.string(),
	phone: z.string().nullable(),
	age: z.number().min(16, "Вам должно быть 16 лет или больше").nullable(),

	country: z.number().nullable(),
	city: z.number().nullable(),

	photo: z.string().nullable(),

	description: z.string().nullable().optional(),
	is_staff: z.boolean(),
})

export type User = z.infer<typeof userSchema>
