import { Slot } from "@radix-ui/react-slot"
import { cn } from "@share/lib"
import { createElement, forwardRef, type HTMLAttributes, type PropsWithChildren } from "react"
import { tags, typographyVariants, type TypographyVariantsProps } from "./variants"

interface ITypographyProps extends PropsWithChildren<HTMLAttributes<HTMLElement> & TypographyVariantsProps> {
	as?: keyof HTMLElementTagNameMap
	asChild?: boolean
}

export const Typography = forwardRef<HTMLElement, ITypographyProps>(
	({ as, asChild, variant, textWidth, textStyle, textTransform, textAlign, className, children, ...props }, ref) => {
		if (asChild) {
			return (
				<Slot
					className={cn(typographyVariants({ variant, textWidth, textStyle, textTransform, textAlign, className }))}
					{...props}
					ref={ref}
				/>
			)
		}

		return createElement(
			as || tags[variant || "content1"],
			{
				...props,
				className: cn(typographyVariants({ variant, textWidth, textStyle, textTransform, textAlign, className })),
				ref,
			},
			children,
		)
	},
)

Typography.displayName = "Typography"

export type TypographyVariants = Exclude<TypographyVariantsProps["variant"], null | undefined>
