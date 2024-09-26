import { create } from "zustand"

interface UseBecomeStoreState {
	currentStep: number
	setCurrentStep: (step: number) => void
}

export const useBecomeStore = create<UseBecomeStoreState>((set) => ({
	currentStep: 0,
	setCurrentStep: (step: number) => set({ currentStep: step }),
}))
