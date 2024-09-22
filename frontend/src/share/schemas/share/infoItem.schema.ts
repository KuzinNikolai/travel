import { z } from "zod"

const translateSchema = z.object({
	name: z.string(),
})

export const infoItemSchema = translateSchema.extend({
	id: z.number(),
	translations: z.record(translateSchema),
})

export type InfoItem = z.infer<typeof infoItemSchema>
