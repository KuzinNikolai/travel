import { create } from "zustand"

export enum BecomeSteps {
	INFO = 0,
	FORM = 1,
}

interface UseBecomeStoreState {
	currentStep: BecomeSteps
	setCurrentStep: (step: BecomeSteps) => void
}

export const useBecomeStore = create<UseBecomeStoreState>((set) => ({
	currentStep: BecomeSteps.INFO,
	setCurrentStep: (step: number) => set({ currentStep: step }),
}))
