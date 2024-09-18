"use client"

import { useLogin } from "@feature/auth/login"
// import { useFormDataStore } from "@feature/registration/formDataStore"
import { useServerActionMutation } from "@share/packages/serverActions"
import { useToast } from "@share/ui/Popups"
import { verifyAction } from "../api/verifyAction"

export function useVerifyCode() {
	const login = useLogin()

	const { toast } = useToast()
	// const { formData } = useFormDataStore()

	const mutation = useServerActionMutation(verifyAction, {
		onSuccess: async () => {
			toast({
				title: "Успех",
				description: "Вы успешно подтвердили почту",
			})

			// if (formData) {
			// 	await login.mutateAsync(formData)
			// }
		},
		onError: (err) => {
			switch (err.code) {
				case "FORBIDDEN": {
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
		},
	})

	return mutation
}
