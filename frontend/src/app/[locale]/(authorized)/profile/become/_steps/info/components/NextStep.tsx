"use client"

import { Button } from "@share/ui/Buttons"
import { useTranslations } from "next-intl"
import { BecomeSteps, useBecomeStore } from "../../../_provider/useBecomeStore"

export const NextStep = () => {
	const t = useTranslations("pages.become")
	const { setCurrentStep } = useBecomeStore()

	const onGoToNextStep = () => {
		setCurrentStep(BecomeSteps.FORM)
	}

	return (
		<Button
			variant='outline'
			className='my-5'
			onClick={onGoToNextStep}
		>
			{t("becomeAction")}
		</Button>
	)
}
