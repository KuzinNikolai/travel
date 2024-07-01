import { useCallback, useState } from "react"

interface IUseStepsArgs {
	initialStep?: number
	maxSteps?: number
}

const maxStep = (step: number, max: number) => Math.min(step, max)

export const useMultistepForm = ({ initialStep = 0, maxSteps = Number.POSITIVE_INFINITY }: IUseStepsArgs) => {
	const [currentStep, setCurrentStep] = useState(initialStep)

	const goToStep = useCallback((step: number) => setCurrentStep(step), [])
	const nextStep = useCallback(() => setCurrentStep((val) => maxStep(val + 1, maxSteps)), [maxSteps])
	const backStep = useCallback(() => setCurrentStep((val) => Math.max(val - 1, 0)), [])

	return {
		currentStep,
		isFirstStep: currentStep === 0,
		isLastStep: currentStep === maxSteps,
		goToStep,
		nextStep,
		backStep,
	}
}
