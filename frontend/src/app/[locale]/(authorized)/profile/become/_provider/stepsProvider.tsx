"use client"

import type { FC } from "react"
import { useBecomeStore } from "./useBecomeStore"

interface StepsProviderProps {
	info: JSX.Element
	form: JSX.Element
}

export const StepsProvider: FC<StepsProviderProps> = ({ info, form }) => {
	const { currentStep } = useBecomeStore()

	return {
		0: info,
		1: form,
	}[currentStep]
}
