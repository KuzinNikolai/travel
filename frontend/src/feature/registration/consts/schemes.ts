import { registrationRequestSchema } from "@api/auth/registration/_schema"
import type { z } from "zod"

export const firstInfoSchema = registrationRequestSchema.pick({
	email: true,
	password: true,
})

export const additionalInformationSchema = registrationRequestSchema.omit({
	email: true,
	password: true,
})

export type FirstInformation = z.infer<typeof firstInfoSchema>
export type AdditionalInformation = z.infer<typeof additionalInformationSchema>
