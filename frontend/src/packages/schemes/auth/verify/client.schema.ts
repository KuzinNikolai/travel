import { z } from "zod"
import { verificationCode } from "./server.schema"

export const verificationRequestSchema = z.object({ code: verificationCode })
export type VerificationRequest = z.infer<typeof verificationRequestSchema>

export const verificationResponseSchema = z
	.object({ token: z.string() })
	.or(z.object({ code: z.string(), error: z.unknown() }))
	.readonly()
export type VerificationResponse = z.infer<typeof verificationResponseSchema>
