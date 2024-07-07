import { registrationRequestSchema } from "@api/auth/registration/_schema"
import type { z } from "zod"

export const firstInfoSchema = registrationRequestSchema.pick({
	email: true,
	password: true,
})

export const additionalInformationSchema = registrationRequestSchema.omit(
	Object.keys(firstInfoSchema.keyof().Enum).reduce((obj, key) => Object.assign(obj, { [key]: true }), {}),
)

export type FirstInformation = z.infer<typeof firstInfoSchema>
export type AdditionalInformation = z.infer<typeof additionalInformationSchema>
