import { create } from "zustand"
import { persist } from "zustand/middleware"

export enum RegistrationSteps {
	FirstInfo = 0,
	Verify = 1,
}

type FormState = {
	currentStep: RegistrationSteps
}

interface Setters {
	setStep: (step: RegistrationSteps) => void
}

type Store = FormState & Setters

export const useFormStepsStore = create(
	persist<Store>(
		(set) => ({
			currentStep: 0,

			setStep(step) {
				set({ currentStep: step })
			},
		}),
		{ name: "registration-steps",  },
	),
)
