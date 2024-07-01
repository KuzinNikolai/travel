import { z } from "zod"
import { tokenSchema } from "../tokenSchema"

export const logoutRequestScheme = z.object({ token: tokenSchema })
export type LogoutRequest = z.infer<typeof logoutRequestScheme>

export const logoutResponseScheme = z.string().or(z.object({ detail: z.string() }))
export type LogoutResponse = z.infer<typeof logoutResponseScheme>
