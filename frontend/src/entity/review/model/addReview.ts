import { useServerActionMutation } from "@share/serverActions/model"
import { useToast } from "@share/ui/Popups"
import { createReview } from "../api/ctreateReview"

export function useAddReview() {
	const { toast } = useToast()

	const mutation = useServerActionMutation(createReview, {
		networkMode: "online",
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
