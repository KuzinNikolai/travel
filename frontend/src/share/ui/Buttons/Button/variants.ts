import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-sm rounded-sm uppercase outline-none transition-all ring-offset-width-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-secondary-90 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				primary: "bg-primary-60 text-base-180 hover:bg-primary-80",
				secondary: "bg-base-160 text-base-0 hover:bg-base-150",
				outline:
					"text-primary-60 ring-[2px] ring-primary-60 hover:text-primary-80 hover:ring-primary-70 hover:ring-[4px]",
				ghost: "text-primary-60 hover:text-primary-80",
				disabled: "text-base-60 bg-base-160 transition-none cursor-not-allowed focus-visible:ring-transparent",
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