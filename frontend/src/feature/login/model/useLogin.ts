"use client"

import { useUserTokenStore } from "@entity/user"
import { useToast } from "@share/ui"
import { useEffect } from "react"
import { useMutation, useQueryClient } from "react-query"
import type { z } from "zod"
import { clientLogin } from "../api/client"
import type { loginRequestScheme } from "../consts/schemas"

export function useLogin() {
	const queryClient = useQueryClient()

	const { setToken } = useUserTokenStore()
	const { toast } = useToast()

	const loginMutation = useMutation((data: z.infer<typeof loginRequestScheme>) => clientLogin(data))

	useEffect(() => {
		if (!loginMutation.isSuccess) {
			toast({
				title: "Ошибка",
				description: "Произошла ошибка на сервере при попытке входа. Попробуйте ещё раз позже",
			})
			return
		}

		if ("code" in loginMutation.data) {
			switch (loginMutation.data.code) {
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
		} else {
			setToken(loginMutation.data.token)
			toast({
				title: "Успех",
				description: "Вы успешно вошли в систему",
			})
			queryClient.invalidateQueries(["login"])
		}
	}, [loginMutation.data, loginMutation.isSuccess, setToken, toast])

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
