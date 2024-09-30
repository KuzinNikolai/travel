"use client"

import { queryKeyFactory, useServerActionMutation } from "@share/packages/serverActions"
import { useToast } from "@share/ui/Popups"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import type { z } from "zod"
import { editTourAction, editTourActionInputSchema } from "./editTourAction"

export type EditTour = z.infer<typeof editTourActionInputSchema>
export const editTourFormSchema = editTourActionInputSchema

export const useEditTour = () => {
	const t = useTranslations()
	const { toast } = useToast()
	const queryClient = useQueryClient()

	return useServerActionMutation(editTourAction, {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKeyFactory.supplierTours(),
				exact: true,
			})
		},
		onError: (err) => {
			toast({
				title: t("errors.editTour"),
				description: err.message,
			})
		},
	})
}
