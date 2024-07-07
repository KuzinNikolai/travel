import { clientErrorResponseSchema } from "@share/api"
import { tokenSchema } from "@share/constants/schemes"
import { z } from "zod"

// Client

export const loginRequestSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})

const codes = z.enum([
	"INVALID_BODY",
	"SERVER_ERROR",
	"INVALID_CREDENTIALS",
	"INVALID_RESPONSE_BODY",
	"INTERNAL_SERVER_ERROR",
])

export const loginResponseSchema = z
	.object({
		token: tokenSchema,
	})
	.or(clientErrorResponseSchema(codes))

export type LoginRequest = z.infer<typeof loginRequestSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>

// API

export const loginServerResponseSchema = z.object({
	auth_token: tokenSchema,
})

export const invalidServerLoginErrorSchema = z.object({
	non_field_errors: z.string().array(),
})

export type LoginServerResponse = z.infer<typeof loginServerResponseSchema>
export type InvalidServerLoginErrorSchema = z.infer<typeof invalidServerLoginErrorSchema>
