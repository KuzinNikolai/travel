import { userSchema } from "@entity/user/consts"
import { z } from "zod"

export const loginRequestScheme = userSchema
	.pick({
		email: true,
	})
	.extend({
		password: z.string().min(6),
	})

export const loginResponseScheme = z.object({ token: z.string() })
