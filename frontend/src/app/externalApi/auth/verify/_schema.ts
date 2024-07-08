import { clientErrorResponseSchema } from "@share/api"
import { z } from "zod"

export const verificationCodeSchema = z.string().length(6).regex(/^\d+$/g)

// Client

export const verificationRequestSchema = z.object({ code: verificationCodeSchema })

const codes = z.enum(["INVALID_BODY", "SERVER_ERROR", "INVALID_CODE", "INVALID_RESPONSE_BODY"])

export const verificationResponseSchema = z
	.object({
		success: z.literal(true),
	})
	.or(clientErrorResponseSchema(codes))

export type VerificationRequest = z.infer<typeof verificationRequestSchema>
export type VerificationResponse = z.infer<typeof verificationResponseSchema>

// API

export const verificationServerRequestSchema = z.object({
	email_verification_code: verificationCodeSchema,
})

export const verificationServerResponseSchema = z.object({ message: z.string() })
export const verificationServerResponseErrorSchema = z.object({ error: z.string() })

export type VerificationServerRequest = z.infer<typeof verificationServerRequestSchema>
