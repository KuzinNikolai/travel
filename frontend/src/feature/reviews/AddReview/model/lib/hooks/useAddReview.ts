"use client"

import type { Review } from "@entity/review"
import { useUser } from "@entity/user"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useServerActionMutation } from "@share/serverActions/model"
import { useToast } from "@share/ui/Popups"
import { useQueryClient } from "@tanstack/react-query"
import { addReviewAction } from "../serverActions/addReviewAction"

export function useAddReview(tourId: number) {
	const { toast } = useToast()
	const {
		query: { data: user },
	} = useUser()
	const queryClient = useQueryClient()

	const mutation = useServerActionMutation(addReviewAction, {
		networkMode: "online",
		async onSettled() {
			return await queryClient.invalidateQueries({ queryKey: queryKeyFactory.reviewListByTour(tourId) })
		},
		async onMutate(newData) {
			await queryClient.cancelQueries({ queryKey: queryKeyFactory.reviewListByTour(tourId) })

			const previousData = queryClient.getQueryData<Review[]>(queryKeyFactory.reviewListByTour(tourId))

			queryClient.setQueryData<Review[]>(queryKeyFactory.reviewListByTour(tourId), (old) => [
				...(old || []),
				{
					id: -1,
					user: user?.id as number,
					user_photo: "",
					tour: tourId,
					user_full_name: newData.user_full_name as string,
					text: newData.text,
					rating: newData.rating,
					created_date: new Date(),
				},
			])

			return { previousData }
		},
		onError(err) {
			switch (err.code) {
				case "NOT_AUTHORIZED": {
					toast({
						title: "Error by create review",
						description: "Your not authorized",
					})
					break
				}
				case "INPUT_PARSE_ERROR": {
					toast({
						title: "Error by create review",
						description: "Invalid token",
					})
					break
				}
				default: {
					toast({
						title: "Error by create review",
						description: "Review is not created",
					})
				}
			}
		},
	})

	return mutation
}
