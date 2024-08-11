import { pxToRem } from "./utils"

const boxShadow = {
	primary: `${pxToRem(6)}em ${pxToRem(3)}em ${pxToRem(3)}em rgba(0, 0, 0, 0.25)`,
} as const

type BoxShadow = typeof boxShadow

export { boxShadow, type BoxShadow }
