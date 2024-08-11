import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
	"flex w-full gap-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				primary: "bg-base-160 border border-base-140",
			},
			size: {
				sm: "px-[8px] py-[6px]",
				md: "px-[12px] py-[8px]",
				lg: "px-[16px] py-[12px]",
			},
			leftIcon: {
				sm: "!pl-[48px]",
				md: "!pl-[44px]",
				lg: "!pl-[40px]",
			},
			rightIcon: {
				sm: "!pr-[16px]",
				md: "!pr-[18px]",
				lg: "!pr-[22px]",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
)

type InputVariants = VariantProps<typeof inputVariants>

export { inputVariants, type InputVariants }
