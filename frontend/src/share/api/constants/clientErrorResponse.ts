import { z } from "zod"

export const clientErrorResponseSchema = <Codes extends z.ZodType>(codes: Codes) =>
	z.object({
		code: codes,
		message: z.unknown(),
	})
