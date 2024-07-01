import { z } from "zod"

export const infoItemSchema = z.object({
	id: z.number(),
	name: z.string(),
})

export type IInfoItem = z.infer<typeof infoItemSchema>
