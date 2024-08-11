import { Slot } from "@radix-ui/react-slot"
import { createElement, forwardRef, type HTMLAttributes, type PropsWithChildren } from "react"
import { typographyVariants, type TypographyVariantsProps } from "./variants"

interface TypographyProps extends PropsWithChildren<HTMLAttributes<HTMLElement> & TypographyVariantsProps> {
	as?: keyof HTMLElementTagNameMap
	asChild?: boolean
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
	(
		{ as, asChild, variant, textWidth, textStyle, textTransform, textAlign, className, textColor, children, ...props },
		ref,
	) => {
		const classes = typographyVariants({
			variant,
			textWidth,
			textStyle,
			textTransform,
			textAlign,
			textColor,
			className,
		})

		if (asChild) {
			return (
				<Slot
					className={classes}
					{...props}
					ref={ref}
				>
					{children}
				</Slot>
			)
		}

		return createElement(as || "p", { ...props, className: classes, ref }, children)
	},
)

Typography.displayName = "Typography"

export * as TypographyVariants from "./variants"
