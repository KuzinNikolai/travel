import { z } from "zod"

export type NonNullableObj<T extends Record<string, unknown>> = { [K in keyof T]-?: Exclude<T[K], null | undefined> }

export function nonNullableObj<T extends Record<string, unknown>>(val: T, ctx: z.RefinementCtx) {
	const res = {} as T

	for (const [key, value] of Object.entries(val)) {
		if (value == null) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Cannot be null",
				path: [key],
			})
		} else if (value === undefined) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Cannot be undefined",
				path: [key],
			})
		} else {
			res[key as keyof T] = value as T[keyof T]
		}
	}

	return val as NonNullableObj<T>
}
