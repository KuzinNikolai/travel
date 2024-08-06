import { z } from "zod"

export enum GroupType {
	group = 1,
	individual = 2,
}

const pricesSchema = z
	.object({
		adult_price: z.number(),
		child_price: z.number(),
		individual_price: z.literal(0).nullable(),
	})
	.or(
		z.object({
			adult_price: z.literal(0).nullable(),
			child_price: z.literal(0).nullable(),
			individual_price: z.number(),
		}),
	)

export const programSchema = z
	.object({
		id: z.number(),
		type: z.nativeEnum(GroupType).nullable(),
		title: z.string(),
		description: z.string(),
		group_size: z.number().nullable(),
	})
	.and(pricesSchema)

export type Program = z.infer<typeof programSchema>
