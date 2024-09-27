import { z } from "zod"

export const durationSchema = z
	.object({
		day: z.number(),
		hour: z.number(),
	})
	.nullable()

export type Duration = Exclude<z.infer<typeof durationSchema>, null>
