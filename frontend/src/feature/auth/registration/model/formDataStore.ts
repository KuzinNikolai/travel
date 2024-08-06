import { create } from "zustand"
import type { FirstInformation } from "../consts/stepsData.schema"

type FormState = {
	formData: FirstInformation | null
}

interface Setters {
	setData: (data: FirstInformation | null) => void
}

type Store = FormState & Setters

export const useFormDataStore = create<Store>((set) => ({
	currentStep: 0,
	formData: null,

	setData(data) {
		set({ formData: data })
	},
}))

export const getRegistrationData = () => useFormDataStore.getState().formData
