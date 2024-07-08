"use client"

import clsx from "clsx"
import NextLink from "next/link"
import { type HTMLAttributes, forwardRef } from "react"

interface ILinkProps extends HTMLAttributes<HTMLAnchorElement> {
	href: string
	variant?: "primary" | "secondary"
	size?: "normal" | "small"
	leftIcon?: JSX.Element
	rightIcon?: JSX.Element
}

export const Link = forwardRef<HTMLAnchorElement, ILinkProps>(
	({ variant, size, leftIcon, rightIcon, children, ...props }, ref) => {
		return (
			<NextLink
				{...props}
				ref={ref}
				className={clsx("flex items-center px-3 py-2", props.className)}
			>
				{leftIcon}
				{children}
				{rightIcon}
			</NextLink>
		)
	},
)

Link.displayName = "Link"
