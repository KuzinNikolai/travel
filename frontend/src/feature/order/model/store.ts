import type { Program, Tour } from "@entity/tour"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface IValues {
	tourSlug: Tour["slug"] | null
	programId: Program["id"] | null
}

interface IMethods {
	setTour(tourSlug: Tour["slug"]): void
	setProgram(programId: Program["id"]): void
	reset(): void
}

type IOrderStorage = IValues & IMethods

export const useOrderStore = create(
	persist<IOrderStorage>(
		(set) => ({
			tourSlug: null,
			programId: null,

			setTour(tourSlug) {
				set({ tourSlug })
			},
			setProgram(programId) {
				set({ programId })
			},
			reset() {
				set({ tourSlug: null, programId: null })
			},
		}),
		{
			name: "order-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
)
