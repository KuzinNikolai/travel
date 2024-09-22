import { z } from "zod"

export const userSchema = z.object({
	id: z.number(),
	email: z.string().email(),
	username: z.string(),

	first_name: z.string().max(30),
	last_name: z.string().max(30),
	phone: z.string().nullable(),
	age: z.number().min(16, "MIN_AGE").nullable(),

	country: z.number().nullable(),
	city: z.number().nullable(),

	photo: z.string().nullable(),

	description: z
		.string()
		.max(260, {
			message: "TO_BIG_DESCRIPTION_LENGTH (260)",
		})
		.nullable()
		.optional(),
	is_staff: z.boolean(),
})

export const authorSchema = userSchema
	.pick({
		id: true,
		first_name: true,
		last_name: true,
		email: true,
		photo: true,
	})
	.extend({ full_name: z.string() })

export type User = z.infer<typeof userSchema>
export type Author = z.infer<typeof authorSchema>