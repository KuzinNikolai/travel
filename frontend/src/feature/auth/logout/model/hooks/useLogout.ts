import { __DEV__ } from "@share/constants/mode"
import { logger } from "@share/lib"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionMutation } from "@share/serverActions/model"
import { useToast } from "@share/ui/Popups"
import { useQueryClient } from "@tanstack/react-query"
import { logoutAction } from "../serverActions/logoutAction"

export function useLogout() {
	const queryClient = useQueryClient()

	const { toast } = useToast()

	const mutation = useServerActionMutation(logoutAction, {
		onSuccess() {
			if (__DEV__) {
				logger.debug("Logout success")
				toast({
					title: "Успешно",
					description: "Успешный выход с аккаунта",
				})
			}

			queryClient.invalidateQueries({ queryKey: queryKeyFactory.user() })
		},
		onError(err) {
			switch (err.code) {
				case "INTERNAL_SERVER_ERROR": {
					toast({
						title: "Ошибка",
						description: "Произошла ошибка на сервере при попытке выхода. Попробуйте ещё раз позже",
					})
					break
				}
				case "FORBIDDEN": {
					toast({
						title: "Ошибка",
						description: "Вы не можете выйти с аккаунта",
					})
					break
				}
			}
		},
	})

	return mutation
}
