import { z } from "zod"

export const tokenRegex = /^[a-zA-Z0-9]{40}$/gi
export const tokenSchema = z.string().regex(tokenRegex)

export const tokenWithPrefixSchema = z
	.string()
	.regex(tokenRegex)
	.transform((token) => `Token ${token}`)
