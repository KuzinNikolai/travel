"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { InputOTP, InputOTPSlot } from "@share/ui/Inputs"
import { Typography } from "@share/ui/Text"
import { useEffect, useRef, type FC } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useVerifyCode } from "../model/useVerifyCode"
import { verifyRequestSchema } from "../consts/schema"

interface VerificationFormProps {
	onFinish: () => void
}

const verifyCodeRequestSchema = z.object({ code: verifyRequestSchema })
type VerifyCodeRequestSchema = z.infer<typeof verifyCodeRequestSchema>

export const VerificationForm: FC<VerificationFormProps> = ({ onFinish }) => {
	const verify = useVerifyCode()

	const formRef = useRef<HTMLFormElement>(null)
	const form = useForm<VerifyCodeRequestSchema>({ resolver: zodResolver(verifyCodeRequestSchema) })

	const onSubmit = form.handleSubmit(async ({ code }) => verify.mutateAsync(code))

	useEffect(() => {
		if (verify.isSuccess) onFinish()
	}, [verify.isSuccess, onFinish])

	const onChangeCode = (value: string) => {
		form.setValue("code", value)
		if (value.length >= 6) formRef.current?.requestSubmit()
	}

	return (
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
							<Typography>
								Проверьте почту на код подтверждения. Если его нет, посмотрите в папке &quot;спам&quot;.
							</Typography>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
