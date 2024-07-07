import { useToast } from "@share/ui"
import { useEffect } from "react"
import { useMutation, useQueryClient } from "react-query"
import { clientRegistration } from "../api/client"
import type { AdditionalInformation } from "../consts/schemes"

interface UseRegistrationFormArgs {
	onNextStep: () => void
	onBack: () => void
}

export function useRegistrationForm({ onNextStep, onBack }: UseRegistrationFormArgs) {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const registrationMutation = useMutation((data: AdditionalInformation) => clientRegistration(data), {
		onSuccess: (data) => {
			if ("code" in data) {
				switch (data.code) {
					case "INVALID_BODY": {
						toast({
							title: "Ошибка",
							description: "Некорректные данные",
						})
						break
					}
					case "USER_ALREADY_EXISTS": {
						toast({
							title: "Ошибка",
							description: "Пользователь с почтой уже существует",
						})
						onBack()
						break
					}
					default:
						toast({ title: "Ошибка", description: "Неизвестная ошибка при регистрации" })
				}
			} else {
				onNextStep()
				queryClient.invalidateQueries(["user"])
				toast({
					title: "Успешно",
					description: "Вы успешно зарегистрировались. Осталось только подтвердить почту",
				})
			}
		},
	})

	const onSubmit = (data: AdditionalInformation) => {
		registrationMutation.mutate(data)
	}

	return {
		isRegistered: () => registrationMutation,
		onSubmit,
		registration: registrationMutation.mutate,
		...registrationMutation,
	}
}
