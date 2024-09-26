import { cn } from "@share/packages/tailwindHelpers"
import { type VariantProps, cva } from "class-variance-authority"

const buttonVariants = cva(
	cn(
		"inline-flex items-center justify-center gap-sm rounded-sm uppercase outline-none transition-all ring-offset-width-2",
		"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-secondary-90",
		"disabled:cursor-not-allowed",
	),
	{
		variants: {
			variant: {
				primary: cn("bg-primary-60 text-base-180 hover:bg-primary-80", "disabled:text-base-120 disabled:bg-base-160"),
				secondary: cn("bg-base-160 text-base-0 hover:bg-base-150", "disabled:text-base-120 disabled:bg-base-160"),
				outline: cn(
					"text-primary-60 ring-[2px] ring-primary-60 hover:text-primary-80 hover:ring-primary-70 hover:ring-[4px]",
					"disabled:ring-base-160",
				),
				ghost: cn("text-primary-60 hover:text-primary-80", "disabled:text-base-120"),
			},
			size: {
				lg: "px-sm py-[15x] text-contentLarge text-medium",
				md: "px-[12px] py-[10px] text-contentPrimary text-medium",
				sm: "px-[10px] py-[6px] text-contentSecondary text-medium",
			},
		},
		defaultVariants: {
			variant: "secondary",
			size: "md",
		},
	},
)

type ButtonVariants = VariantProps<typeof buttonVariants>

export { buttonVariants, type ButtonVariants }
