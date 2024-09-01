"use client"

import { __DEV__ } from "@share/constants/mode"
import { logger } from "@share/lib"
import { useServerActionMutation } from "@share/serverActions/model"
import { useToast } from "@share/ui/Popups"
import { useQueryClient } from "@tanstack/react-query"
import { loginAction } from "../serverActions/loginAction"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"

export function useLogin() {
	const queryClient = useQueryClient()

	const { toast } = useToast()

	const mutation = useServerActionMutation(loginAction, {
		onSuccess: () => {
			if (__DEV__) {
				logger.info("Login success")
				toast({ title: "Успешно вход в систему", })
			}

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
