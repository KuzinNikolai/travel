import { z } from "zod"

export const dateTimeSchema = z
	.string()
	.datetime()
	.transform((str) => new Date(str))
// .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/i)
