"use client"

import { queryKeyFactory, useServerActionMutation } from "@share/packages/serverActions"
import { useToast } from "@share/ui/Popups"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { createTourAction, createTourActionInputSchema } from "./createTourAction"

export type CreateTour = Parameters<typeof createTourAction>[0]
export const createTourFormSchema = createTourActionInputSchema

export const useCreateTour = () => {
	const t = useTranslations()
	const { toast } = useToast()
	const queryClient = useQueryClient()

	return useServerActionMutation(createTourAction, {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeyFactory.supplierTours(),
				exact: true,
			})
		},
		onError: (err) => {
			toast({
				title: t("errors.createTour"),
				description: err.message,
			})
		},
	})
}
