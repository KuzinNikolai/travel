import { useFormDataStore } from "@feature/registration/model/formDataStore"
import { RegistrationSteps, useFormStepsStore } from "@feature/registration/model/formStepStore"
import { VerificationForm } from "@feature/verification"
import { Button } from "@share/ui/Buttons"
import { Typography } from "@share/ui/Text"
import { type FC, useCallback } from "react"

interface VerifyCodeProps {
	onFinish: () => void
}

export const VerifyCode: FC<VerifyCodeProps> = ({ onFinish }) => {
	const { setStep } = useFormStepsStore()
	const { setData, formData } = useFormDataStore()

	const onRevert = () => {
		setStep(RegistrationSteps.FirstInfo)
		setData(null)
	}

	const onSuccess = useCallback(() => {
		setStep(RegistrationSteps.FirstInfo)
		setData(null)
		onFinish()
	}, [setStep, setData])

	return (
		<>
			<div className='flex flex-col text-content1'>
				<Typography variant='content1'>
					Код подтверждения отправлен на почту{" "}
					<Typography
						variant='span'
						textWidth='bold'
					>
						{formData?.email ?? "неизвестно"}
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
