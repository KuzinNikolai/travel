"use client"

import { useUserTokenStore } from "@entity/user"
import { __DEV__ } from "@share/constants/mode"
import { logger } from "@share/lib"
import { useServerActionMutation } from "@share/serverActions/model"
import { useToast } from "@share/ui/Popups"
import { useQueryClient } from "@tanstack/react-query"
import { loginAction } from "../api/loginAction"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"

export function useLogin() {
	const queryClient = useQueryClient()

	const { setToken } = useUserTokenStore()
	const { toast } = useToast()

	const mutation = useServerActionMutation(loginAction, {
		onSuccess: (data) => {
			if (__DEV__) {
				logger.info("Login success")
				toast({ title: "Успешно вход в систему", description: data.token })
			}

			setToken(data.token)
			queryClient.invalidateQueries({ queryKey: queryKeyFactory.account() })
		},
		onError(err) {
			switch (err.code) {
				case "INTERNAL_SERVER_ERROR": {
					toast({
						title: "Ошибка",
						description: "Произошла ошибка на сервере при попытке входа. Попробуйте ещё раз позже",
					})
					break
				}
			}
		},
	})

	return mutation
}
