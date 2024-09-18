import { __DEV__ } from "@share/constants/environment"
import { queryKeyFactory, useServerActionMutation } from "@share/packages/serverActions"
import { useToast } from "@share/ui/Popups"
import { useQueryClient } from "@tanstack/react-query"
import { becomeGuideAction } from "../api/becomGuideAction"

export const useBecomeGuide = () => {
	const queryClient = useQueryClient()

	const { toast } = useToast()

	const mutation = useServerActionMutation(becomeGuideAction, {
		onSuccess() {
			if (__DEV__) {
				toast({
					title: "Успешно",
					description: "Вы стали гидом",
				})
			}
			queryClient.invalidateQueries({ queryKey: queryKeyFactory.user() })
		},
		onError(err) {
			switch (err.code) {
				case "ERROR": {
					if (err.data === "ALREADY_GUIDER") {
						toast({
							title: "Ошибка при попытке стать гидом",
							description: "Вы уже являетесь гидом",
						})
					}
					break
				}
				case "INTERNAL_SERVER_ERROR": {
					toast({
						title: "Ошибка",
						description: "Произошла ошибка при попытке стать гидом. Попробуйте позже",
					})
					break
				}
			}
		},
	})

	return mutation
}
