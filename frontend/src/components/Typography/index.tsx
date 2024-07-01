import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"
import { type HTMLAttributes, type PropsWithChildren, createElement, forwardRef } from "react"
import { type TypographyVariantsProps, tags, typographyVariants } from "./typography"

interface ITypographyProps extends PropsWithChildren<HTMLAttributes<HTMLElement> & TypographyVariantsProps> {
	as?: keyof HTMLElementTagNameMap
	asChild?: boolean
}

export const Typography = forwardRef<HTMLElement, ITypographyProps>(
	({ as, asChild, variant, textWidth, textStyle, textTransform, textAlign, className, children, ...props }, ref) => {
		if (asChild) {
			return (
				<Slot
					className={clsx(typographyVariants({ variant, textWidth, textStyle, textTransform, textAlign, className }))}
					{...props}
					ref={ref}
				/>
			)
		}

		return createElement(
			as || tags[variant || "content1"],
			{
				...props,
				className: clsx(typographyVariants({ variant, textWidth, textStyle, textTransform, textAlign, className })),
				ref,
			},
			children,
		)
	},
)

Typography.displayName = "Typography"

export type TypographyVariants = Exclude<TypographyVariantsProps["variant"], null | undefined>
