import { __DEV__ } from "@share/constants/mode"
import { logger } from "@share/lib"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionMutation } from "@share/serverActions/model"
import { useToast } from "@share/ui/Popups"
import { useQueryClient } from "@tanstack/react-query"
import { logoutAction } from "../api/logoutAction"
import { useUserTokenStore } from "@entity/user"

export function useLogout() {
	const queryClient = useQueryClient()

	const userToken = useUserTokenStore()
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

			userToken.setToken(null)
			queryClient.invalidateQueries({ queryKey: queryKeyFactory.account() })
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
