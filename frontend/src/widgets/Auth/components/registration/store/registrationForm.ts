"use client"

import { SafeJson } from "@/packages/utils/SafeJson"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { type FirstInfo, firstInfoSchema } from "../schema"

interface IValues {
	formData: string | null
	currentStep: number
}

interface IMethods {
	getFormData(): FirstInfo | null
	setFormData(data: FirstInfo | null): void

	setStep(step: number): void
}

type IStorage = IValues & IMethods

export const useRegistrationFormStore = create(
	persist<IStorage>(
		(set, get) => ({
			formData: null,
			currentStep: 0,

			getFormData() {
				try {
					const str = atob(get().formData ?? "null")
					const data = str === "null" ? null : SafeJson.parse(str)
					const res = firstInfoSchema.safeParse(data).data

					if (!res) {
						return null
					}

					return res
				} catch {
					set({ formData: null })
					return null
				}
			},
			setFormData(data) {
				const str = SafeJson.stringify(data)
				set({ formData: str ? btoa(str) : null })
			},

			setStep(step) {
				set({ currentStep: step })
			},
		}),
		{
			name: "afis", // auth-first-info-storage
			storage: createJSONStorage(() => localStorage),
		},
	),
)
