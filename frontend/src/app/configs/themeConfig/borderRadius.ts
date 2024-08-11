import { pxToRem } from "./utils"

const borderRadius = {
	full: "100%",
	sm: `${pxToRem(5)}em`,
	md: `${pxToRem(10)}em`,
} as const

type BorderRadius = typeof borderRadius

export { borderRadius, type BorderRadius }