"use client"

import { __DEV__ } from "@share/constants/environment"
import { print } from "@share/packages/logger"
import { queryKeyFactory, useServerActionMutation } from "@share/packages/serverActions"
import { useToast } from "@share/ui/Popups"
import { useQueryClient } from "@tanstack/react-query"
import { loginAction } from "../serverActions/loginAction"

export function useLogin() {
	const queryClient = useQueryClient()

	const { toast } = useToast()

	const mutation = useServerActionMutation(loginAction, {
		onSuccess: () => {
			if (__DEV__) {
				print.info("Login success")
				toast({ title: "Успешно вход в систему" })
			}

			queryClient.invalidateQueries({ queryKey: queryKeyFactory.user() })
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
