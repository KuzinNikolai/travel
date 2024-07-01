import { registrationRequestSchema } from "@/packages/schemes/auth/registration/server.schema"
import { z } from "zod"

export const firstInfoSchema = registrationRequestSchema.pick({
	email: true,
	password: true,
})

export type FirstInfo = z.infer<typeof firstInfoSchema>

export const additionalInformationSchema = registrationRequestSchema.pick({
	first_name: true,
	last_name: true,
	age: true,
})
export type AdditionalInformation = z.infer<typeof additionalInformationSchema>

export const registrationResponseSchema = z
	.object({
		...firstInfoSchema.shape,
		...additionalInformationSchema.shape,
	})
	.omit({
		password: true,
	})
