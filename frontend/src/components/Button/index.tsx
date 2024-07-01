"use client"

import clsx from "clsx"
import { type HTMLAttributes, forwardRef } from "react"
import { Icon, type IconsName } from "../Icon"

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary"
	size?: "normal" | "small"
	leftIcon?: IconsName
	rightIcon?: IconsName
	color?: string
	hoverColor?: string
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
	({ variant, size, leftIcon, rightIcon, color, hoverColor, ...props }, ref) => {
		return (
			<button
				{...props}
				ref={ref}
				className={clsx(
					"flex items-center px-3 py-2",
					props.className,
					color && `text-[${color}] [&>svg]:stroke-[${color}]`,
					hoverColor && `hover:text-[${hoverColor}] hover:[&>svg]:stroke-[${hoverColor}]`,
				)}
			>
				{leftIcon && <Icon name={leftIcon} />}
				{props?.children}
				{rightIcon && <Icon name={rightIcon} />}
			</button>
		)
	},
)

Button.displayName = "Button"
