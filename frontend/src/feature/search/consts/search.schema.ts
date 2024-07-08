import { z } from "zod"

export const searchItemSchema = z.object({
	title: z.string(),
	citySlug: z.string(),
	tourSlug: z.string().optional(),
})

export const searchGroupSchema = z.object({
	id: z.string(),
	items: searchItemSchema.array(),
})
