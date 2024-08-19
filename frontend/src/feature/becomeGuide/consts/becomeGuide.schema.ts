import { userSchema } from "@entity/user"
import { nonNullableObj } from "@share/lib/helpers/NoNullableObj"
import type { z } from "zod"

export const becomeGuideSchema = userSchema.pick({
	country: true,
	city: true,
	phone: true,
})
// .transform(nonNullableObj)

export type BecomeGuide = z.infer<typeof becomeGuideSchema>