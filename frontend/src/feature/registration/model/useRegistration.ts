"use client"

import type { RegistrationErrorCodes, RegistrationRequest, RegistrationResponse } from "@api/auth/registration/_schema"
import { useToast } from "@share/ui/Popups"
import type { AxiosError } from "axios"
import { useMutation } from "react-query"
import { clientRegistration } from "../api/client"

interface UseRegistrationArgs {
	onSuccess: () => void
	onError: (code: RegistrationErrorCodes) => void
}

export function useRegistration({ onSuccess, onError }: UseRegistrationArgs) {
	const { toast } = useToast()

	const registrationMutation = useMutation((data: RegistrationRequest) => clientRegistration(data), {
		onSuccess: (data) => {
			if (!data) {
				return
			}

			toast({
				title: "Успешно",
				description: "Вы успешно зарегистрировались. Осталось только подтвердить почту",
			})

			onSuccess()
		},
		onError: (err) => {
			const data = (err as AxiosError<RegistrationResponse>).response?.data

			if (!data || !("code" in data)) {
				toast({ title: "Ошибка", description: "Неизвестная ошибка при регистрации" })
				return
			}

			switch (data.code) {
				case "INVALID_BODY": {
					toast({
						title: "Ошибка",
						description: "Некорректные данные",
					})
					onError("INVALID_BODY")
					break
				}
				case "USER_ALREADY_EXISTS": {
					toast({
						title: "Ошибка",
						description:
							"Пользователь с такой почтой уже зарегистрирован. Попробуйте другой адрес или воспользуйтесь функцией восстановления пароля",
					})
					onError("USER_ALREADY_EXISTS")
					break
				}
				default:
					toast({ title: "Ошибка", description: "Произошла ошибка при регистрации, позже попробуйте ещё раз" })
					onError("SERVER_ERROR")
			}
		},
	})

	return {
		isRegistered: () => registrationMutation,
		registration: registrationMutation.mutate,
		registrationMutation: registrationMutation,
	}
}
