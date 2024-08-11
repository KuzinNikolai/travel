import { cva, type VariantProps } from "class-variance-authority"

export const iconButtonVariants = cva(
	"inline-flex items-center justify-center gap-sm rounded-full uppercase outline-none transition-all ring-offset-width-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-secondary-90 disabled:pointer-events-none",
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
				lg: "w-[28px] h-[28px] p-[7px] text-contentLarge text-medium",
				md: "w-[32px] h-[32px] p-[7px] text-contentPrimary text-medium",
				sm: "w-[38px] h-[38px] p-[7px] text-contentSecondary text-medium",
			},
		},
		defaultVariants: {
			variant: "secondary",
			size: "md",
		},
	},
)

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>
