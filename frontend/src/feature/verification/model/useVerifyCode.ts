"use client"

import {
	verificationRequestSchema,
	type VerificationRequest,
	type VerificationResponse,
} from "@api/auth/verify/_schema"
import { useLogin } from "@feature/login"
import { useRegistrationFormStore } from "@feature/registration/model/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@share/ui/Popups"
import type { AxiosError } from "axios"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { clientVerification } from "../api/client"
import { logger } from "@share/lib"

interface UseVerifyCodeArgs {
	onSuccess: () => void
}

export function useVerifyCode({ onSuccess }: UseVerifyCodeArgs) {
	const { toast } = useToast()
	const { loginAsync } = useLogin()
	const { getFormData, setFormData } = useRegistrationFormStore()

	const formRef = useRef<HTMLFormElement>(null)
	const form = useForm<VerificationRequest>({ resolver: zodResolver(verificationRequestSchema) })

	const { mutateAsync } = useMutation((code: string) => clientVerification({ code: code }), {
		onSuccess: async (data) => {
			if (!data || "code" in data) {
				toast({
					title: "Ошибка",
					description: "При проверке кода произошла ошибка",
				})
				return
			}

			toast({
				title: "Успех",
				description: "Вы успешно подтвердили почту",
			})

			const loginData = getFormData()

			onSuccess()

			const loginResponse = loginData ? await loginAsync(loginData).finally(() => setFormData(null)) : undefined

			if (loginResponse && "token" in loginResponse) {
				toast({
					title: "Успех",
					description: "Вы успешно вошли в систему",
				})
			}
		},
		onError: (err: AxiosError<VerificationResponse>) => {
			const data = err.response?.data

			if (!data || !("code" in data)) {
				toast({ title: "Ошибка", description: "Неизвестная ошибка при проверке кода" })
				return
			}

			switch (data.code) {
				case "INVALID_CODE": {
					form.setError("code", {
						type: "invalid",
						message: "Неверный код",
					})
					break
				}
				case "SERVER_ERROR": {
					toast({
						title: "Ошибка",
						description: "На сервере при проверке кода произошла ошибка",
					})
					break
				}
				default:
					toast({
						title: "Ошибка",
						description: "При проверке кода произошла ошибка",
					})
			}

			form.reset({ code: "" })
		},
	})

	const onSubmit = form.handleSubmit(async ({ code }) => {
		mutateAsync(code)
	})

	const onChangeCode = (value: string) => {
		form.setValue("code", value)
		if (value.length >= 6) formRef.current?.requestSubmit()
	}

	return {
		onSubmit,
		onChangeCode,
		formRef,
		form,
		isSuccessVerification: () => {
			return
		},
	}
}
