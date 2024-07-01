import { z } from "zod"

export const verificationCode = z.string().regex(/^\d{6}$/g)

export const verificationServerRequestSchema = z.object({
	email_verification_code: verificationCode,
})
export type VerificationServerRequest = z.infer<typeof verificationServerRequestSchema>

export const verificationServerResponseSchema = z
	.object({ message: z.string() })
	.or(z.object({ error: z.string() }))
	.readonly()
export type VerificationServerResponse = z.infer<typeof verificationServerResponseSchema>
