import { registrationRequestSchema } from "./registrationAction.schema"
import type { z } from "zod"

export const firstInfoSchema = registrationRequestSchema.pick({
	email: true,
	password: true,
})
export type FirstInformation = z.infer<typeof firstInfoSchema>
