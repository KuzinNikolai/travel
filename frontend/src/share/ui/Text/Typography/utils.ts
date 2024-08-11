import * as styles from "@app/configs/themeConfig"

export const variants = Object.keys(styles.typography) as (keyof styles.Typography)[]

export type Variants = typeof variants

// Text Variants
export const allVariants = variants.reduce(
	(acc, variant) => {
		acc[variant] = `text-${variant}`
		return acc
	},
	{} as Record<Variants[number], `text-${Variants[number]}`>,
)

// Text Colors
type ColorCategories = keyof styles.Colors
type ShadeKeys<T> = keyof T
type ColorShadesArray = {
	// @ts-expect-error
	[K in ColorCategories]: `${K}-${ShadeKeys<styles.Colors[K]>}`
}[ColorCategories]

const textColors = Object.entries(styles.colors).reduce((acc, [category, shades]) => {
	for (const shade of Object.keys(shades)) {
		acc.push(`${category}-${shade}` as ColorShadesArray)
	}
	return acc
}, [] as ColorShadesArray[])

export const textColorsVariants = textColors.reduce(
	(acc, color) => {
		acc[color] = `text-${color}`
		return acc
	},
	{} as Record<(typeof textColors)[number], `text-${(typeof textColors)[number]}`>,
)
