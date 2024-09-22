import { userSchema } from "@share/schemas"
import type { z } from "zod"

export const becomeGuideSchema = userSchema.pick({
	country: true,
	city: true,
	phone: true,
})

export type BecomeGuide = z.infer<typeof becomeGuideSchema>
