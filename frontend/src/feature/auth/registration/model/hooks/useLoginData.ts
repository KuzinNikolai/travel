import type { LoginRequest } from "@feature/auth/login"
import { create } from "zustand"

type FormState = {
	formData: LoginRequest | null
}

interface Setters {
	setData: (data: LoginRequest | null) => void
}

type Store = FormState & Setters

export const useLoginDataStore = create<Store>((set) => ({
	currentStep: 0,
	formData: null,

	setData(data) {
		set({ formData: data })
	},
}))

export const getRegistrationData = () => useLoginDataStore.getState().formData
