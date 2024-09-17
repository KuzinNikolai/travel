import { pxToRem } from "./utils";

const typography = {
	h1: [
		`${pxToRem(48)}em`,
		{
			fontWeight: "500",
			letterSpacing: `${pxToRem(0)}em`,
			lineHeight: "1em",
		},
	],
	h2: [
		`${pxToRem(44)}em`,
		{
			fontWeight: "500",
			letterSpacing: `${pxToRem(0)}em`,
			lineHeight: "1em",
		},
	],
	h3: [
		`${pxToRem(40)}em`,
		{
			fontWeight: "500",
			letterSpacing: `${pxToRem(0)}em`,
			lineHeight: "1em",
		},
	],
	h4: [
		`${pxToRem(36)}em`,
		{
			fontWeight: "500",
			letterSpacing: `${pxToRem(0)}em`,
			lineHeight: "1em",
		},
	],
	h5: [
		`${pxToRem(32)}em`,
		{
			fontWeight: "500",
			letterSpacing: `${pxToRem(0)}em`,
			lineHeight: "1em",
		},
	],
	h6: [
		`${pxToRem(28)}em`,
		{
			fontWeight: "500",
			letterSpacing: `${pxToRem(0)}em`,
			lineHeight: "1.2em",
		},
	],
	h7: [
		`${pxToRem(24)}em`,
		{
			fontWeight: "500",
			letterSpacing: `${pxToRem(0)}em`,
			lineHeight: "1.2em",
		},
	],

	link: [
		`${pxToRem(16)}em`,
		{
			fontWeight: "500",
			letterSpacing: `${pxToRem(0)}em`,
			lineHeight: "1em",
		},
	],
	label: [
		`${pxToRem(16)}em`,
		{
			fontWeight: "500",
			letterSpacing: `${pxToRem(0)}em`,
			lineHeight: "1em",
		},
	],

	contentLarge: [
		`${pxToRem(18)}em`,
		{
			fontWeight: "500",
			letterSpacing: `${pxToRem(1.2)}em`,
			lineHeight: "1em",
		},
	],
	contentPrimary: [
		`${pxToRem(16)}em`,
		{
			fontWeight: "300",
			letterSpacing: `${pxToRem(1.2)}em`,
			lineHeight: "1em",
		},
	],
	contentSecondary: [
		`${pxToRem(12)}em`,
		{
			fontWeight: "300",
			letterSpacing: `${pxToRem(1.2)}em`,
			lineHeight: "1em",
		},
	],
} as const;

type Typography = typeof typography;

const variants = Object.keys(typography) as Array<keyof Typography>;
type Variants = typeof variants;

const allVariants = variants.reduce(
	(acc, variant) => {
		// @ts-expect-error
		acc[variant] = `text-${variant}`;
		return acc;
	},
	{} as { [Key in Variants[number]]: `text-${Key}` },
);

export { typography, variants, allVariants, type Typography, type Variants };
