import { AddReviewForm } from "@feature/reviews/AddReview/ui/AddReviewForm"
import type { FC } from "react"
import { ReviewList } from "./components/ReviewList"
import { getTourReviews } from "@entity/review"
import { logger } from "@share/lib"

interface ReviewsProps {
	tourId: number
	showAddReviewForm?: boolean
}

export const Reviews: FC<ReviewsProps> = async ({ tourId, showAddReviewForm }) => {
	const reviews = await getTourReviews(tourId)

	logger.debug("reviews", reviews)

	return (
		<div className='flex flex-col'>
			{showAddReviewForm && <AddReviewForm />}
			<ReviewList reviews={reviews || []} />
		</div>
	)
}
