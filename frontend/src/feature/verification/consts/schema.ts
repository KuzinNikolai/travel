import { z } from "zod"

export const verificationResponseSchema = z.object({ success: z.boolean() }).or(z.object({ code: z.string() }))
