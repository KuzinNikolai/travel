const keyframes = {
	loading: {
		to: {
			backgroundPosition: "100% 0, 0 0, 0 50%,  0 100%, 100% 100%",
		},
	},
	"accordion-down": {
		from: { height: "0" },
		to: { height: "var(--radix-accordion-content-height)" },
	},
	"accordion-up": {
		from: { height: "var(--radix-accordion-content-height)" },
		to: { height: "0" },
	},
} as const

type Keyframes = typeof keyframes

const animation = {
	"accordion-down": "accordion-down 0.2s ease-out",
	"accordion-up": "accordion-up 0.2s ease-out",
} as const

type Animation = typeof animation

export { animation, keyframes, type Animation, type Keyframes }
