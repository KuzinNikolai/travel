import { z } from "zod"

export const infoItemSchema = z.object({
	id: z.number(),
	name: z.string(),
})

export type InfoItem = z.infer<typeof infoItemSchema>
