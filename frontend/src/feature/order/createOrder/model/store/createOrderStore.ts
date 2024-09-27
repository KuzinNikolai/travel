"use client"

import type { Tour, shareSchemas } from "@share/schemas"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Values {
	tourId: Tour["id"] | null
	programId: shareSchemas.Program["id"] | null
}

interface Methods {
	setTour(tourId: Tour["id"]): void
	setProgram(programId: shareSchemas.Program["id"]): void
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
