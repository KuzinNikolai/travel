import { z } from "zod"

export const invalidLoginErrorSchema = z.object({
	non_field_errors: z.string().array(),
})
