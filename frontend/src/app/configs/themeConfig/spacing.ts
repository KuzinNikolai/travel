import { pxToRem } from "./utils"

const spacing = {
	none: "0",
	sm: `${pxToRem(10)}em`,
	md: `${pxToRem(20)}em`,
	lg: `${pxToRem(30)}em`,
} as const

type Spacing = typeof spacing

export { spacing, type Spacing }