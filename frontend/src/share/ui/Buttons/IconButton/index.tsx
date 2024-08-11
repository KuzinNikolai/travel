import { Slot } from "@radix-ui/react-slot"

import { Icon, type IconsName } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"
import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactElement } from "react"
import { iconButtonVariants, type IconButtonVariants } from "./variants"

interface IconButtonProps extends Partial<ButtonHTMLAttributes<HTMLButtonElement>>, IconButtonVariants {
	icon: IconsName | ReactElement
	iconProps?: HTMLAttributes<SVGSVGElement>
	description: string
	asChild?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ className, variant, description, size, icon, iconProps, asChild = false, children, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"

		return (
			<Comp
				{...props}
				ref={ref}
				className={iconButtonVariants({ variant, size, className })}
			>
				<div className='relative'>
					{typeof icon === "string" ? (
						<Icon
							name={icon}
							{...iconProps}
						/>
					) : (
						icon
					)}
					{children}
					<Typography className='sr-only absolute'>{description}</Typography>
				</div>
			</Comp>
		)
	},
)

IconButton.displayName = "Button"

export { IconButton, type IconButtonProps, type IconButtonVariants }
