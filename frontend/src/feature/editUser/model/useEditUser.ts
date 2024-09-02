import { useServerActionMutation } from "@share/serverActions/model"
import { useQueryClient } from "@tanstack/react-query"
import { editUserAction } from "../api/editUserAction"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useToast } from "@share/ui/Popups"
import { __DEV__ } from "@share/constants/mode"

export function useEditUser() {
	const userClient = useQueryClient()

	const { toast } = useToast()

	const mutation = useServerActionMutation(editUserAction, {
		onSuccess(data) {
			if (__DEV__) {
				toast({
					title: "Успешно",
					description: "Профиль успешно отредактирован",
				})
			}
			userClient.setQueryData(queryKeyFactory.user(), data)
		},
		onError(err) {
			switch (err.code) {
				case "INTERNAL_SERVER_ERROR": {
					toast({
						title: "Ошибка",
						description: "Произошла ошибка при попытке редактирования профиля. Попробуйте ещё раз позже",
					})
					break
				}
			}
		},
	})

	return mutation
}
