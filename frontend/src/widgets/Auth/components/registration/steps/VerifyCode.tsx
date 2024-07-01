import { Button } from "@/components/Buttons/Button"
import { Typography } from "@/components/Typography"
import { clientVerify } from "@/packages/API/fetches/auth/client"
import { useLogin } from "@/packages/hooks/auth/login"
import { useModalsStore } from "@/packages/stores/modals"
import { logger } from "@/packages/utils/logger"
import { useToast } from "@/widgets/Toaster"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/@ui/form"
import { InputOTP, InputOTPSlot } from "@components/@ui/input-otp"
import { zodResolver } from "@hookform/resolvers/zod"
import { type VerificationRequest, verificationRequestSchema } from "@packages/schemes/auth/verify/client.schema"
import { type FC, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { useRegistrationFormStore } from "../store/registrationForm"

interface IVerifyCodeProps {
	goToStep: (step: number) => void
}

export const VerifyCode: FC<IVerifyCodeProps> = ({ goToStep }) => {
	const { setModal } = useModalsStore()
	const { getFormData, setFormData, setStep } = useRegistrationFormStore()
	const formRef = useRef<HTMLFormElement>(null)
	const login = useLogin()
	const { toast } = useToast()

	const form = useForm<VerificationRequest>({ resolver: zodResolver(verificationRequestSchema) })

	const onSubmit = form.handleSubmit(async (data: VerificationRequest) => {
		let res: Response | null = null

		try {
			res = await clientVerify(data)
		} catch (e) {
			logger.error("VerifyCode onSubmit", e)
			form.reset({ code: "" })
			return toast({ title: "Ошибка", description: "При проверке кода произошла ошибка" })
		}

		if (!res.ok) {
			const json = (await res.json()) as { code: string }

			switch (json.code) {
				case "FORBIDDEN": {
					form.setError("code", {
						type: "invalid",
						message: "Неверный код",
					})
					break
				}
				case "SERVER_ERROR": {
					toast({ title: "Ошибка", description: "На сервере при проверке кода произошла ошибка" })
					break
				}
				default:
					toast({ title: "Ошибка", description: "При проверке кода произошла ошибка" })
			}

			form.reset({ code: "" })
		}

		toast({ title: "Поздравляем", description: "Вы успешно зарегистрировались!" })

		const formData = getFormData()
		if (formData) {
			await login({ email: formData.email, password: formData.password })
			setFormData(null)
		}

		setModal("auth", false)
		setStep(0)
	})

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
			<Form {...form}>
				<form
					onSubmit={onSubmit}
					className='space-y-3'
					ref={formRef}
				>
					<FormField
						name='code'
						render={({ field }) => (
							<FormItem>
								<FormLabel>* Код</FormLabel>
								<FormControl>
									<InputOTP
										maxLength={6}
										{...field}
										onChange={onChangeCode}
										className='!gap-[0.4rem] w-full'
										disabled={form.formState.isSubmitting}
									>
										<InputOTPSlot
											index={0}
											className='flex-1'
										/>
										<InputOTPSlot
											index={1}
											className='flex-1'
										/>
										<InputOTPSlot
											index={2}
											className='flex-1'
										/>
										<InputOTPSlot
											index={3}
											className='flex-1'
										/>
										<InputOTPSlot
											index={4}
											className='flex-1'
										/>
										<InputOTPSlot
											index={5}
											className='flex-1'
										/>
									</InputOTP>
								</FormControl>
								<FormMessage />
								<FormDescription>
									Код подтверждения приходит на вашу почту, пожалуйста, проверьте почту. Если вы не получили код,
									пожалуйста, проверьте папку спам. Если вы не можете получить код, пожалуйста, обратитесь в службу
									поддержки.
								</FormDescription>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</>
	)
}
