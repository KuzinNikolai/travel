import { userSchema } from "@share/schemas"
import { passwordScheme } from "@share/schemas/share"
import type { z } from "zod"

export const registrationDataSchema = userSchema
	.pick({
		email: true,
		first_name: true,
		last_name: true,
		age: true,
	})
	.partial({
		first_name: true,
		last_name: true,
		age: true,
	})
	.extend({ password: passwordScheme })

export type RegistrationData = z.infer<typeof registrationDataSchema>
