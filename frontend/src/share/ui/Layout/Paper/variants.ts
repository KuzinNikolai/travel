import { type VariantProps, cva } from "class-variance-authority";

const paperVariants = cva("relative overflow-hidden rounded-sm", {
	variants: {
		color: {
			primary: "bg-base-170",
			secondary: "bg-base-160",
			trinity: "bg-base-150",
		},
		size: {
			sm: "p-sm",
			md: "p-md",
			lg: "p-lg",
		},
		radius: {
			sm: "rounded-sm",
			md: "rounded-md",
			lg: "rounded-lg",
		},
	},
	defaultVariants: {
		color: "primary",
		size: "sm",
		radius: "md",
	},
});

type PaperVariants = VariantProps<typeof paperVariants>;

export { paperVariants, type PaperVariants };
