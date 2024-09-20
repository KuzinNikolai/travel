"use client"

import type { FC } from "react"
import { useBecomeStepsStore } from "./useBecomeSteps.store"

interface StepsProviderProps {
	steps: [JSX.Element, JSX.Element]
}

export const StepsProvider: FC<StepsProviderProps> = ({ steps }) => {
	const { currentStep } = useBecomeStepsStore()

	return steps.at(currentStep)
}
