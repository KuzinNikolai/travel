import { clientErrorResponseSchema, serverErrorResponseSchema } from "@share/api"
import { logger } from "@share/lib"
import { z } from "zod"

// Client

const codes = z.enum(["UNAUTHORIZED", "INVALID_TOKEN", "INTERNAL_SERVER_ERROR"])

const userSchema = z.object({
	id: z.number(),
	email: z.string().email(),
	first_name: z.string(),
	last_name: z.string(),
	phone: z.string().nullable(),
	age: z.number().nullable(),

	country: z.number().nullable(),
	city: z.number().nullable(),

	photo: z.string().nullable(),

	is_staff: z.boolean(),
})

export const userResponseSchema = userSchema.or(clientErrorResponseSchema(codes))

export type UserResponse = z.infer<typeof userResponseSchema>

// API

export const userServerResponseSchema = userSchema.or(serverErrorResponseSchema)
