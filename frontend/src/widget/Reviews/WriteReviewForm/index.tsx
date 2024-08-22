"use client"

import type { Tour } from "@entity/tour"
import { AddReviewForm } from "@feature/reviews/AddReview"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "@share/ui/Buttons"
import { Dialog, DialogContent } from "@share/ui/Modals"
import { useTranslations } from "next-intl"
import { useState, type FC } from "react"

interface WriteReviewFormProps {
	tourId: Tour["id"]
}

export const WriteReviewForm: FC<WriteReviewFormProps> = ({ tourId }) => {
	const [expand, setExpand] = useState(false)
	const t = useTranslations()

	return (
		<Dialog
			onOpenChange={(expand) => setExpand(expand)}
			open={expand}
		>
			<DialogTrigger asChild>
				<Button variant='ghost'>{t("components.reviews.writeReview")}</Button>
			</DialogTrigger>
			<DialogContent>
				<AddReviewForm
					tourId={tourId}
					onSuccessAdd={() => setExpand(false)}
				/>
			</DialogContent>
		</Dialog>
	)
}