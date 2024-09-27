import { useLogin } from "@feature/auth/login"
import { VerificationForm } from "@feature/auth/verification"
import { safe } from "@share/packages/safeApi"
import { Button } from "@share/ui/Buttons"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import { type FC, useCallback } from "react"
import { useLoginDataStore } from "../../model/hooks/useLoginData"
import { RegistrationSteps, useRegistrationStepsStore } from "../../model/hooks/useRegistrationSteps"

interface VerifyCodeProps {
	onFinish: () => void
}

export const VerifyCode: FC<VerifyCodeProps> = ({ onFinish }) => {
	const t = useTranslations()
	const { setStep } = useRegistrationStepsStore()
	const { setData, formData } = useLoginDataStore()

	const { mutateAsync: login } = useLogin()

	const onRevert = () => {
		setStep(RegistrationSteps.FirstInfo)
		setData(null)
	}

	const onSuccessFinish = useCallback(async () => {
		setStep(RegistrationSteps.FirstInfo)

		if (formData) {
			const { success } = await safe(login(formData))

			if (success) setData(null)
		}

		onFinish()
	}, [setStep, setData, login, formData, onFinish])

	return (
		<>
			<div className='flex flex-col text-content1'>
				<Typography variant='contentPrimary'>
					{t.rich("components.auth.verify.sendedCode", {
						email: (chunks) => (
							<Typography
								variant='contentPrimary'
								textWidth='bold'
							>
								{formData?.email ?? chunks}
							</Typography>
						),
					})}
				</Typography>
				<Button
					variant='secondary'
					className='contents text-content1 text-danger'
					onClick={onRevert}
				>
					{t("components.auth.register.takeStepBack")}
				</Button>
			</div>
			<VerificationForm onFinish={onSuccessFinish} />
		</>
	)
}
