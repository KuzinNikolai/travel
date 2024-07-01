import clsx from "clsx"
import { type FC, type HTMLAttributes, createElement } from "react"

const variants = {
	main: "bg-background-400",
} satisfies Record<string, string>

interface IPaperProps extends HTMLAttributes<HTMLDivElement> {
	variant: keyof typeof variants
	as?: keyof HTMLElementTagNameMap
}

export const Paper: FC<IPaperProps> = ({ className, variant, children, as, ...props }) => {
	return createElement(
		as || "div",
		{
			...props,
			className: clsx(variants[variant], className),
		},
		children,
	)
}
