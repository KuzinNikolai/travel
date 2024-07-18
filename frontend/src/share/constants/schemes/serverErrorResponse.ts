import { z } from "zod"

export const serverErrorResponseSchema = z.object({ detail: z.string(), message: z.unknown().optional() })
