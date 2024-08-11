import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

import { buttonVariants, type ButtonVariants } from "./variants"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"

		return (
			<Comp
				type='button'
				ref={ref}
				className={buttonVariants({ variant, size, className })}
				{...props}
			/>
		)
	},
)

Button.displayName = "Button"

export { Button, buttonVariants, type ButtonProps }
