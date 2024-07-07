import { z } from "zod"

export const verificationCodeSchema = z.string().length(6).regex(/^\d+$/g)
