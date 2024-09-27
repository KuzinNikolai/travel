"use client"

import { __DEV__ } from "@share/constants/environment"
import { useServerActionMutation } from "@share/packages/serverActions"
import { useToast } from "@share/ui/Popups"
import { verifyAction } from "../serverActions/verifyAction"

export function useVerifyCode() {
	const { toast } = useToast()

	const mutation = useServerActionMutation(verifyAction, {
		onSuccess: async () => {
			if (__DEV__) {
				return
			}

			toast({
				title: "Успех",
				description: "Вы успешно подтвердили почту",
			})
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
