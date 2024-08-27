"use client"

import { __DEV__ } from "@share/constants/mode"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionMutation } from "@share/serverActions/model"
import { useToast } from "@share/ui/Popups"
import { useQueryClient } from "@tanstack/react-query"
import { redirect } from "next/navigation"
import { useCreateOrderStore } from "../../store/createOrderStore"
import { createOrderAction } from "../serverActions/createOrderAction"
import { useEffect } from "react"

export function useCreateOrder() {
	const queryClient = useQueryClient()

	const { toast } = useToast()
	const createOrderStore = useCreateOrderStore()

	const createOrderMutation = useServerActionMutation(createOrderAction, {
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: queryKeyFactory.supplierOrders(),
				stale: true,
			})

			if (__DEV__) {
				toast({
					title: "success",
					description: "Заказ успешно сформирован",
				})
			}
		},
		onError() {
			toast({
				title: "Error occurred",
				description: "Не удалось добавить новый заказ, попробуйте позже",
			})
		},
		onSettled() {
			createOrderStore.reset()
		},
	})

	useEffect(() => {
		if (createOrderMutation.isSuccess) {
			redirect(".")
		}
	}, [createOrderMutation.isSuccess])

	return createOrderMutation
}
