"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { InputOTP, InputOTPSlot } from "@share/ui/Inputs"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import { type FC, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useVerifyCode } from "../model/hooks/useVerifyCode"
import { verifyRequestSchema } from "../model/schema"

interface VerificationFormProps {
	onFinish: () => void
}

const verifyCodeRequestSchema = z.object({ code: verifyRequestSchema })
type VerifyCodeRequestSchema = z.infer<typeof verifyCodeRequestSchema>

export const VerificationForm: FC<VerificationFormProps> = ({ onFinish }) => {
	const t = useTranslations()

	const verify = useVerifyCode()

	const formRef = useRef<HTMLFormElement>(null)
	const form = useForm<VerifyCodeRequestSchema>({
		resolver: zodResolver(verifyCodeRequestSchema),
	})

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
							<FormLabel>* {t("components.auth.verify.code")}</FormLabel>
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
								{t.rich("components.auth.verify.message", {
									span: (chunks) => (
										<Typography
											variant='contentPrimary'
											textWidth='bold'
											className='inline-flex rounded-md bg-base-150 p-2'
											as='span'
										>
											{chunks}
										</Typography>
									),
								})}
							</Typography>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
