"use client";

import { logger } from "@share/lib";
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory";
import { useServerActionMutation } from "@share/serverActions/model";
import { useToast } from "@share/ui/Popups";
import { useQueryClient } from "@tanstack/react-query";
import { addReviewAction } from "../serverActions/addReviewAction";

export function useAddReview(tourId: number) {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const mutation = useServerActionMutation(addReviewAction, {
		networkMode: "online",
		async onSuccess() {
			logger.debug("ADD NEW REVIEW");

			await queryClient.invalidateQueries({
				queryKey: queryKeyFactory.reviewListByTour(tourId),
			});
		},
		onError(err) {
			switch (err.code) {
				case "NOT_AUTHORIZED": {
					toast({
						title: "Error by create review",
						description: "Your not authorized",
					});
					break;
				}
				case "INPUT_PARSE_ERROR": {
					toast({
						title: "Error by create review",
						description: "Invalid token",
					});
					break;
				}
				default: {
					toast({
						title: "Error by create review",
						description: "Review is not created",
					});
				}
			}
		},
	});

	return mutation;
}
