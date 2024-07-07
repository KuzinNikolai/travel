import { verificationRequestSchema, type VerificationRequest } from "@api/auth/verify/_schema"
import { VerificationForm } from "@feature/verification"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Typography } from "@share/ui"
import { useEffect, useRef, type FC } from "react"
import { useForm } from "react-hook-form"
import { useRegistrationFormStore } from "../../model/store"

interface IVerifyCodeProps {
	goToStep: (step: number) => void
	onFinish: () => void
}

export const VerifyCode: FC<IVerifyCodeProps> = ({ goToStep, onFinish }) => {
	const { getFormData, setFormData } = useRegistrationFormStore()
	const formRef = useRef<HTMLFormElement>(null)

	const form = useForm<VerificationRequest>({ resolver: zodResolver(verificationRequestSchema) })

	useEffect(() => {
		form.setFocus("code")
	}, [])

	const onChangeCode = (value: string) => {
		form.setValue("code", value)
		if (value.length >= 6) formRef.current?.requestSubmit()
	}

	const onRevert = () => {
		goToStep(0)
		setFormData(null)
	}

	const formData = getFormData()

	return (
		<>
			<div className='flex flex-col text-content1'>
				<Typography variant='content1'>
					Код подтверждения отправлен на почту {formData?.email ?? "неизвестно"}, если это не правильная почта вы можете
					вернуться на 1 этап.
				</Typography>
				<Button
					variant='link'
					className='contents text-content1 text-danger'
					onClick={onRevert}
				>
					Перейти на этап регистрации
				</Button>
			</div>
			<VerificationForm />
		</>
	)
}
