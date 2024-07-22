import { userSchema } from "@entity/user"
import { tokenSchema } from "@share/constants/schemes"
import { z } from "zod"

export const loginRequestSchema = userSchema.pick({ email: true }).extend({ password: z.string().min(6) })
export const loginResponseSchema = z.object({ token: tokenSchema })

export const loginServerResponseSchema = z
	.object({ auth_token: tokenSchema })
	.or(z.object({ non_field_error: z.string().array() }))
