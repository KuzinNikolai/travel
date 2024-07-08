import { clientErrorResponseSchema } from "@share/api"
import { z } from "zod"

// Client

const codes = z.enum([
	"UNAUTHORIZED",
	"INVALID_TOKEN",
	"INVALID_RESPONSE_BODY",
	"LOGOUT",
	"SERVER_ERROR",
	"INTERNAL_SERVER_ERROR",
])

export const logoutResponseSchema = z
	.object({
		success: z.literal(true),
	})
	.or(clientErrorResponseSchema(codes))

export type LogoutResponse = z.infer<typeof logoutResponseSchema>
