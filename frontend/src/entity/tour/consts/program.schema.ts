import { z } from "zod"

export const programSchema = z.object({
	id: z.number(),
	title: z.string(),
	description: z.string(),
	adult_price: z.number(),
	child_price: z.number(),
})

export type Program = z.infer<typeof programSchema>
