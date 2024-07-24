import { z } from "zod"

export type TransformToSelectObject<T extends Record<string, unknown>> = { [key in keyof T]?: boolean }

export function transformToSelectObject<T extends Record<string, unknown>>(val: T, ctx: z.RefinementCtx) {
	const res = {} as TransformToSelectObject<T>

	for (const [key, value] of Object.entries(val)) {
		if (typeof value === "boolean") {
			res[key as keyof typeof val] = value
		} else {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Must be boolean",
				path: [key],
			})
		}
	}

	return res
}
