import type { Program, Tour } from "@entity/tour"
import { create } from "zustand"

interface Values {
	tour: Tour | null
	program: Program | null
}

interface Methods {
	setProgramTour({ tour, program }: { tour: Tour; program: Program }): void
	reset(): void
}

type OrderStorage = Values & Methods

export const useOrderStore = create<OrderStorage>((set) => ({
	tour: null,
	program: null,

	setProgramTour({ tour, program }) {
		set({ tour, program })
	},
	reset() {
		set({ tour: null, program: null })
	},
}))
