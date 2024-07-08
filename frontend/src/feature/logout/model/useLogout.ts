import { useUserTokenStore } from "@entity/user"
import { useMutation, useQueryClient } from "react-query"
import { clientLogout } from "../api/client"
import { toast, useToast } from "@share/ui/Popups"
import type { AxiosError } from "axios"
import type { LogoutResponse } from "@api/auth/logout/_schema"

export function useLogout() {
	const queryClient = useQueryClient()
	const { setToken } = useUserTokenStore()
	const { toast } = useToast()

	const logout = useMutation(() => clientLogout(), {
		onSuccess: (data) => {
			if ("code" in data) {
				return
			}

			queryClient.invalidateQueries(["user"])
			setToken(null)
		},
		onError: (error: AxiosError<LogoutResponse>) => {
			const data = error.response?.data

			if (!data || !("code" in data)) {
				toast({
					title: "Ошибка",
					description: "Произошла ошибка при попытке выхода. Попробуйте ещё раз позже",
				})
				return
			}

			switch (data.code) {
				case "SERVER_ERROR": {
					toast({
						title: "Ошибка",
						description: "Произошла ошибка на сервере при попытке выхода. Попробуйте ещё раз позже",
					})
					break
				}
				case "INVALID_TOKEN": {
					toast({
						title: "Ошибка",
						description: "Неверный код",
					})
					break
				}
				default:
					break
			}
		},
	})

	return {
		logout: logout.mutateAsync,
	}
}
