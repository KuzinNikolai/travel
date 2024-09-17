import { z } from "zod";

export const baseErrorResponseSchema = z.object({
	detail: z.string(),
	message: z.unknown().optional(),
})
