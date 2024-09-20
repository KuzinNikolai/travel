"use client"

import { create } from "zustand"

export enum BecomeSteps {
	Info = 0,
	Form = 1,
}


type BecomeStepsStore = {
	currentStep: BecomeSteps
	nextStep: (step: BecomeSteps) => void
}

export const useBecomeStepsStore = create<BecomeStepsStore>((set) => ({
	currentStep: BecomeSteps.Info,
	nextStep: (step) => set({ currentStep: step }),
}))
