"use client"

import { useNoReload } from "@share/lib"
import { useEffect, type FC, type ReactNode } from "react"
import { RegistrationSteps, useFormStepsStore } from "../model/formStepStore"
import { FirstInfo } from "./Steps/FirstInfo"
import { VerifyCode } from "./Steps/VerifyCode"

interface RegistrationFormProps {
	onFinish?: () => void
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ onFinish }) => {
	const { currentStep } = useFormStepsStore()
	const listenReload = useNoReload()

	useEffect(() => {
		listenReload(true)
	}, [listenReload])

	const steps = {
		[RegistrationSteps.FirstInfo]: <FirstInfo />,
		[RegistrationSteps.Verify]: onFinish && <VerifyCode onFinish={onFinish} />,
	} satisfies { [key in RegistrationSteps]: ReactNode }

	return steps[currentStep as keyof typeof steps]
}
