import type { CreateOrderResponse } from "@api/orders/_schema/POST"
import type { FormCreateOrder } from "@entity/order"
import { useToast } from "@share/ui/Popups"
import type { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import { createOrder } from "../api/createOrder"

export function useCreateOrder() {
	const { toast } = useToast()

	const queryClient = useQueryClient()

	const mutation = useMutation((order: FormCreateOrder) => createOrder(order), {
		onSuccess: (data) => {
			if (!data || "code" in data) {
				return
			}

			queryClient.invalidateQueries("orders")

			toast({
				title: "Успех",
				description: "Заказ успешно создан",
			})
		},
		onError: (error: AxiosError<CreateOrderResponse>) => {
			const data = error.response?.data

			if (!data || !("code" in data)) {
				toast({
					title: "Ошибка",
					description: "Произошла ошибка при попытке создания заказа. Попробуйте ещё раз позже",
				})
				return
			}

			switch (data.code) {
				case "UNAUTHORIZED": {
					toast({
						title: "Ошибка",
						description: "У вас нету доступа к созданию заказа, пожалуйста авторизуйтесь",
					})
					break
				}
				default:
					toast({
						title: "Ошибка",
						description: "Произошла ошибка на сервере при попытке создания заказа. Попробуйте ещё раз позже",
					})
			}
		},
	})

	return {
		createOrder: mutation.mutateAsync,
		status: mutation.status,
	}
}
