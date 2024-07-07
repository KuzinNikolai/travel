import { passwordScheme, userSchema } from "@entity/user"
import { clientErrorResponseSchema } from "@share/api"
import { z } from "zod"

// Client

export const registrationRequestSchema = userSchema
	.pick({
		email: true,
		first_name: true,
		last_name: true,
		age: true,
	})
	.extend({
		password: passwordScheme,
	})

const codes = z.enum([
	"INVALID_BODY",
	"SERVER_ERROR",
	"USER_ALREADY_EXISTS",
	"INVALID_RESPONSE_BODY",
	"INTERNAL_SERVER_ERROR",
])

export const registrationResponseSchema = z
	.object({
		success: z.literal(true),
	})
	.or(clientErrorResponseSchema(codes))

export type RegistrationRequest = z.infer<typeof registrationRequestSchema>
export type RegistrationResponse = z.infer<typeof registrationResponseSchema>

// API

export const registrationServerResponseSchema = registrationRequestSchema.omit({
	password: true,
})

export const registrationServerErrorResponseSCheme = z.object({
	// FIX: nullable or optional
	email: z.string().array().nullable().optional(),
})
