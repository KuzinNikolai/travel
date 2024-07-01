import { z } from "zod"

export const tagSchema = z.object({
	tag: z.string(),
	slug: z.string(),
	active_image: z.string(),
	inactive_image: z.string(),
})

export type ITag = z.infer<typeof tagSchema>
