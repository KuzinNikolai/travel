import { userSchema } from "@share/schemas"
import { passwordScheme } from "@share/schemas/share"
import { z } from "zod"

// Client

export const registrationRequestSchema = userSchema
	.pick({
		email: true,
		first_name: true,
		last_name: true,
		age: true,
	})
	.extend({ password: passwordScheme })

export type RegistrationRequest = z.infer<typeof registrationRequestSchema>

// API

export const registrationServerResponseSchema = registrationRequestSchema.omit({ password: true })
export const registrationServerErrorResponseSCheme = z.object({ email: z.string().array() })
