import { z } from "zod"

const verificationCodeSchema = z.string().length(6).regex(/^\d+$/g)

const responseSchema = z.object({ message: z.string() }).or(z.object({ error: z.string() }))

export interface VerifyRequestServer {
	email_verification_code: string
}

export { verificationCodeSchema, responseSchema, verificationCodeSchema as verifyRequestSchema }
