import { verificationRequestSchema, type VerificationRequest } from "@api/auth/verify/_schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@share/ui/Popups"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { clientVerification } from "../api/client"

export function useVerifyCode() {
	const { toast } = useToast()
	const queryClient = useQueryClient()

	const formRef = useRef<HTMLFormElement>(null)
	const form = useForm<VerificationRequest>({ resolver: zodResolver(verificationRequestSchema) })

	const { mutate, ...mutation } = useMutation({
		mutationFn(code: string) {
			return clientVerification({ code: code })
		},
		onSuccess: (data) => {
			if (!data) {
				toast({
					title: "Ошибка",
					description: "При проверке кода произошла ошибка",
				})
				return
			}

			if ("code" in data) {
				switch (data.code) {
					case "FORBIDDEN": {
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
			} else {
			}
		},
	})

	const onSubmit = form.handleSubmit(async ({ code }) => {
		mutate(code)
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
