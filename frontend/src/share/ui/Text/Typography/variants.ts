import { type VariantProps, cva } from "class-variance-authority";

const typographyVariants = cva(null, {
	defaultVariants: {
		variant: "contentPrimary",
	},
	variants: {
		// variant: allVariants,
		variant: {
			h1: "text-h1",
			h2: "text-h2",
			h3: "text-h3",
			h4: "text-h4",
			h5: "text-h5",
			h6: "text-h6",
			h7: "text-h7",
			link: "text-link",
			label: "text-label",
			contentLarge: "text-contentLarge",
			contentPrimary: "text-contentPrimary",
			contentSecondary: "text-contentSecondary",
		},
		// textColor: textColorsVariants,
		textColor: {
			"base-0": "text-base-0",
			"base-10": "text-base-10",
			"base-20": "text-base-20",
			"base-30": "text-base-30",
			"base-40": "text-base-40",
			"base-50": "text-base-50",
			"base-60": "text-base-60",
			"base-70": "text-base-70",
			"base-80": "text-base-80",
			"base-90": "text-base-90",
			"base-100": "text-base-100",
			"base-110": "text-base-110",
			"base-120": "text-base-120",
			"base-130": "text-base-130",
			"base-140": "text-base-140",
			"base-150": "text-base-150",
			"base-160": "text-base-160",
			"base-170": "text-base-170",
			"base-180": "text-base-180",

			"primary-0": "text-primary-0",
			"primary-10": "text-primary-10",
			"primary-20": "text-primary-20",
			"primary-30": "text-primary-30",
			"primary-40": "text-primary-40",
			"primary-50": "text-primary-50",
			"primary-60": "text-primary-60",
			"primary-70": "text-primary-70",
			"primary-80": "text-primary-80",
			"primary-90": "text-primary-90",

			"secondary-0": "text-secondary-0",
			"secondary-10": "text-secondary-10",
			"secondary-20": "text-secondary-20",
			"secondary-30": "text-secondary-30",
			"secondary-40": "text-secondary-40",
			"secondary-50": "text-secondary-50",
			"secondary-60": "text-secondary-60",
			"secondary-70": "text-secondary-70",
			"secondary-80": "text-secondary-80",
			"secondary-90": "text-secondary-90",
		},
		textWidth: {
			thin: "font-thin",
			extralight: "font-extralight",
			light: "font-light",
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
			extrabold: "font-extrabold",
			black: "font-black",
		},
		textStyle: {
			italic: "italic",
			notItalic: "not-italic",
		},
		textTransform: {
			uppercase: "uppercase",
			lowercase: "lowercase",
			capitalize: "capitalize",
			normal: "normal-case",
		},
		textAlign: {
			left: "text-left",
			center: "text-center",
			right: "text-right",
			justify: "text-justify",
			start: "text-start",
			end: "text-end",
		},
	},
	compoundVariants: [
		{
			variant: "h1",
			textWidth: "bold",
			textColor: "base-0",
		},
		{
			variant: "h2",
			textWidth: "bold",
		},
		{
			variant: "h3",
			textWidth: "bold",
		},
		{
			variant: "h4",
			textWidth: "bold",
		},
		{
			variant: "h5",
			textWidth: "bold",
		},
		{
			variant: "h6",
			textWidth: "bold",
		},
		{
			variant: "h7",
			textWidth: "bold",
			textColor: "base-0",
		},
		{
			variant: "link",
			textWidth: "bold",
		},
		{
			variant: "label",
			textWidth: "bold",
		},
		{
			variant: "contentLarge",
			textWidth: "medium",
		},
		{
			variant: "contentPrimary",
			textWidth: "medium",
		},
		{
			variant: "contentSecondary",
			textWidth: "medium",
		},
	],
});

type TypographyVariantsProps = VariantProps<typeof typographyVariants>;

export { typographyVariants, type TypographyVariantsProps };
