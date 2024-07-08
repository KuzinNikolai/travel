"use client"

import { useMultistepForm, useNoReload } from "@share/lib"
import { useEffect, type FC } from "react"
import { AdditionalInfo } from "./Steps/AdditionalInfo"
import { FirstInfo } from "./Steps/FirstInfo"
import { VerifyCode } from "./Steps/VerifyCode"

interface RegistrationFormProps {
	onFinish: () => void
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ onFinish }) => {
	const { currentStep, goToStep } = useMultistepForm({ maxSteps: 2 })

	const listenReload = useNoReload()

	useEffect(() => {
		listenReload(true)
	}, [])

	const steps = {
		0: <FirstInfo goToStep={goToStep} />,
		1: <AdditionalInfo goToStep={goToStep} />,
		2: (
			<VerifyCode
				goToStep={goToStep}
				onFinish={onFinish}
			/>
		),
	}

	return steps[currentStep as keyof typeof steps]
}
