import { ClientReview, type Review } from "@entity/review"
import { Typography } from "@share/ui/Text"
import { getTranslations } from "next-intl/server"
import type { FC } from "react"

interface ReviewListProps {
	reviews: Review[]
}

export const ReviewList: FC<ReviewListProps> = async ({ reviews }) => {
	const t = await getTranslations()
	return (
		<div className='flex flex-col gap-md'>
			{reviews.length > 0 ? (
				reviews.map((review) => (
					<ClientReview
						key={review.id}
						review={review}
					/>
				))
			) : (
				<Typography>{t("components.reviews.emptyReviews")}</Typography>
			)}
		</div>
	)
}
