import { RegistrationSteps, useRegistrationFormStore } from "@feature/registration/model/store"
import { VerificationForm } from "@feature/verification"
import { logger } from "@share/lib"
import { Button } from "@share/ui/Buttons"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

interface IVerifyCodeProps {
	goToStep: (step: number) => void
	onFinish: () => void
}

export const VerifyCode: FC<IVerifyCodeProps> = ({ goToStep, onFinish }) => {
	const { getFormData, setFormData, setStep } = useRegistrationFormStore()

	const onRevert = () => {
		goToStep(RegistrationSteps.FirstInfo)
		setFormData(null)
	}

	const onSuccess = () => {
		setStep(RegistrationSteps.FirstInfo)
		onFinish()
		setFormData(null)
	}

	return (
		<>
			<div className='flex flex-col text-content1'>
				<Typography variant='content1'>
					Код подтверждения отправлен на почту{" "}
					<Typography
						variant='span'
						textWidth='bold'
					>
						{getFormData()?.email ?? "неизвестно"}
					</Typography>
					, если это не правильная почта вы можете вернуться на 1 этап.
				</Typography>
				<Button
					variant='link'
					className='contents text-content1 text-danger'
					onClick={onRevert}
				>
					Перейти на этап регистрации
				</Button>
			</div>
			<VerificationForm onSuccess={onSuccess} />
		</>
	)
}
