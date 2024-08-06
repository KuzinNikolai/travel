import { z } from "zod"

export const verificationCodeSchema = z.string().length(6).regex(/^\d+$/g)

export const verifyRequestSchema = verificationCodeSchema

export const responseSchema = z.object({ message: z.string() }).or(z.object({ error: z.string() }))

export interface VerifyRequestServer {
	email_verification_code: string
}
