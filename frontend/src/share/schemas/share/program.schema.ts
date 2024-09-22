import { z } from "zod"
import { durationSchema } from "./duration.schema"
import { ProgramTypeEnum } from "../Enums"

const translateSchema = z.object({
	title: z.string(),
	description: z.string(),
})

export const programSchema = translateSchema
	.extend({
		id: z.number().int(),

		type: z.nativeEnum(ProgramTypeEnum),

		group_size: z.number().nullable(),
		duration: durationSchema,

		adult_price: z.number().nullable(),
		child_price: z.number().nullable(),
		individual_price: z.number().nullable(),
		promotion_price: z.number().nullable(),

		translations: z.record(translateSchema),
	})

export type Program = z.infer<typeof programSchema>
