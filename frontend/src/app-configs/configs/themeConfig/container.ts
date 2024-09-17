import { pxToRem } from "./utils";

const container = {
	center: true,
	padding: `${pxToRem(10)}em`,
	screens: {
		sm: "428px",
		md: "768px",
		lg: "1024px",
		xl: "1280px",
	},
} as const;

type Container = typeof container;

export { container, type Container };
