import { Typography, type TypographyVariants } from "@share/ui/Text"
import { forwardRef, type HTMLAttributes, type InputHTMLAttributes, type ReactElement } from "react"
import { inputVariants, type InputVariants } from "./variants"
import { cn } from "@share/packages/tailwindHelpers"

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputVariants> &
	Omit<InputVariants, "leftIcon" | "rightIcon"> & {
		leftIcon?: ReactElement
		rightIcon?: ReactElement
		containerProps?: HTMLAttributes<HTMLDivElement>
	}

const typographyMap = {
	lg: "contentLarge",
	md: "contentPrimary",
	sm: "contentSecondary",
} satisfies Record<NonNullable<InputVariants["size"]>, TypographyVariants.TypographyVariantsProps["variant"]>

const iconSizeMap = {
	lg: "w-[44px] h-[36px]",
	md: "w-[40px] h-[38px]",
	sm: "w-[36px] h-[24px]",
} as Record<NonNullable<InputVariants["size"]>, string>

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, variant, size, leftIcon, rightIcon, ...props }, ref) => {
		return (
			<div
				{...props.containerProps}
				className={cn("relative w-full", props.containerProps?.className)}
			>
				{leftIcon && (
					<div
						className={cn("absolute inset-y-0 top-0 bottom-0 left-0.5 flex items-center", iconSizeMap[size || "md"])}
					>
						{leftIcon}
					</div>
				)}
				<Typography
					variant={typographyMap[size || "md"]}
					asChild
				>
					<input
						type={type}
						className={inputVariants({
							variant,
							size,
							className,
							leftIcon: leftIcon ? size || "md" : undefined,
							rightIcon: rightIcon ? size || "md" : undefined,
						})}
						ref={ref}
						{...props}
					/>
				</Typography>
				{rightIcon && (
					<div
						className={cn("absolute inset-y-0 top-0 right-0.5 bottom-0 flex items-center", iconSizeMap[size || "md"])}
					>
						{rightIcon}
					</div>
				)}
			</div>
		)
	},
)
Input.displayName = "Input"

export { Input }
