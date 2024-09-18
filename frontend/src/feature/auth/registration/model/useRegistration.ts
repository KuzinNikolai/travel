"use client"

import { useServerActionMutation } from "@share/packages/serverActions"
import { useToast } from "@share/ui/Popups"
import { registrationAction } from "../api/registrationAction"

export function useRegistration() {
	const { toast } = useToast()

	const mutation = useServerActionMutation(registrationAction, {
		onError: (err) => {
			switch (err.code) {
				case "CONFLICT": {
					toast({
						title: "Ошибка",
						description:
							"Пользователь с такой почтой уже зарегистрирован. Попробуйте другой адрес или воспользуйтесь функцией восстановления пароля",
					})
					break
				}
				default:
					toast({ title: "Ошибка", description: "Произошла ошибка при регистрации, позже попробуйте ещё раз" })
			}
		},
	})

	return mutation
}
