import { z } from "zod"

// Client

export const searchItemSchema = z.object({
	title: z.string(),
	citySlug: z.string(),
	tourSlug: z.string().optional(),
})

export const searchGroupSchema = z.object({
	id: z.string(),
	items: searchItemSchema.array(),
})

export const searchResponse = searchGroupSchema.array()

export type SearchItem = z.infer<typeof searchItemSchema>
export type SearchGroup = z.infer<typeof searchGroupSchema>
export type SearchResponse = z.infer<typeof searchResponse>
