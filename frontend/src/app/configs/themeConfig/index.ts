import type { CustomThemeConfig } from "tailwindcss/types/config"
import { animation, type Animation, keyframes, type Keyframes } from "./animations"
import { borderRadius, type BorderRadius } from "./borderRadius"
import { boxShadow, type BoxShadow } from "./boxShadow"
import { colors, type Colors } from "./colors"
import { container, type Container } from "./container"
import { spacing, type Spacing } from "./spacing"
import { typography, type Typography } from "./typography"

export const CUSTOM_THEME_CONFIG = {
	container,
	borderRadius: borderRadius,
	dropShadow: boxShadow,
	boxShadow,
	extend: {
		gap: spacing,
		padding: spacing,
		margin: spacing,
		fontSize: typography,
		colors,
		borderRadius,
		keyframes,
		animation,
	},
} satisfies Readonly<Partial<CustomThemeConfig>>

export { animation, borderRadius, boxShadow, colors, container, keyframes, spacing, typography }
export type { Animation, BorderRadius, BoxShadow, Colors, Container, Keyframes, Spacing, Typography }
