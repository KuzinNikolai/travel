"use client"

import type { Program, Tour } from "@entity/tour"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Values {
	tourId: Tour["id"] | null
	programId: Program["id"] | null
}

interface Methods {
	setTour(tourId: Tour["id"]): void
	setProgram(programId: Program["id"]): void
	reset(): void
}

type CreateOrderStorage = Values & Methods

export const useCreateOrderStore = create(
	persist<CreateOrderStorage>(
		(set) => ({
			tourId: null,
			programId: null,

			setTour(tourId) {
				set({ tourId })
			},
			setProgram(programId) {
				set({ programId })
			},
			reset() {
				set({ tourId: null, programId: null })
			},
		}),
		{
			name: "order-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
)
