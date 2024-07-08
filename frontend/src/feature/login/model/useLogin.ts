"use client"

import type { LoginResponse } from "@api/auth/login/_schema"
import { useUserTokenStore } from "@entity/user"
import { useToast } from "@share/ui/Popups"
import type { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import type { z } from "zod"
import { clientLogin } from "../api/client"
import type { loginRequestScheme } from "../consts/schemas"
import { logger } from "@share/lib"
import { __DEV__ } from "@share/constants/mode"

export function useLogin() {
	const queryClient = useQueryClient()

	const { setToken } = useUserTokenStore()
	const { toast } = useToast()

	const loginMutation = useMutation((data: z.infer<typeof loginRequestScheme>) => clientLogin(data), {
		onSuccess: (data) => {
			if ("code" in data) {
				return
			}

			if (__DEV__) {
				logger.info("useLogin onSuccess")
				toast({ description: data.token })
			}

			setToken(data.token)
			toast({
				title: "Успех",
				description: "Вы успешно вошли в систему",
			})
			queryClient.invalidateQueries(["user"])
		},
		onError: (err: AxiosError<LoginResponse>) => {
			const data = err.response?.data

			if (!data || !("code" in data)) {
				toast({ title: "Ошибка", description: "Неизвестная ошибка при попытке входа" })
				return
			}

			switch (data.code) {
				case "INVALID_RESPONSE_BODY": {
					toast({
						title: "Ошибка",
						description: "Произошла ошибка на сервере при попытке входа. Попробуйте ещё раз позже",
					})
					break
				}
				case "INVALID_CREDENTIALS": {
					toast({
						title: "Ошибка",
						description: "Неверный логин или пароль",
					})
					break
				}
				default:
					toast({ title: "Ошибка", description: "Неизвестная ошибка при попытке входа" })
			}
		},
	})

	return {
		isLoading: loginMutation.isLoading,
		isSuccess: loginMutation.isSuccess,
		isError: loginMutation.isError,
		error: loginMutation.error,
		isLogined: () => !!useUserTokenStore.getState().getToken(),
		login: loginMutation.mutate,
		loginAsync: loginMutation.mutateAsync,
	}
}
