import { z } from "zod"

export const userSchema = z.object({
	id: z.number(),
	email: z.string().email(),
	first_name: z.string(),
	last_name: z.string(),
	phone: z.string().nullable(),
	age: z.number().min(16, "Вам должно быть 16 лет или больше"),

	country: z.number().nullable(),
	city: z.number().nullable(),

	photo: z.string().nullable(),

	is_staff: z.boolean(),
})

export type User = z.infer<typeof userSchema>
