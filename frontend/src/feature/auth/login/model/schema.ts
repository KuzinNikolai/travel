import { userSchema } from "@share/schemas"
import { passwordScheme } from "@share/schemas/share"
import type { z } from "zod"

export const loginRequestSchema = userSchema.pick({ email: true }).extend({ password: passwordScheme })
export type LoginRequest = z.infer<typeof loginRequestSchema>
