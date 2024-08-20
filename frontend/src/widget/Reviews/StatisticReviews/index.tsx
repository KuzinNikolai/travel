"use client"

import { calculateOverallRating, useReviews } from "@entity/review"
import type { DetailTour } from "@entity/tour"
import { Rating } from "@share/ui/RatingOld"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"
import { ReviewStatisticItem } from "./components/ReviewStatisticItem"
import { WriteReviewForm } from "./store/WriteReviewForm"
import { getRatingTotalCount } from "./utils/getRatingTotalCount"

type StatisticReviewsProps = Pick<DetailTour, "id">

export const StatisticReviews: FC<StatisticReviewsProps> = ({ id }) => {
	const { data: allReviews, isPaused: pendingAllReviews } = useReviews(id)

	const reviewsTotalScore = Number(calculateOverallRating(allReviews?.map(({ rating }) => rating) || []).toFixed(2))

	const totalStars = {
		5: getRatingTotalCount(allReviews || [], 5),
		4: getRatingTotalCount(allReviews || [], 4),
		3: getRatingTotalCount(allReviews || [], 3),
		2: getRatingTotalCount(allReviews || [], 2),
		1: getRatingTotalCount(allReviews || [], 1),
	}

	return !pendingAllReviews ? (
		<div className='flex flex-col gap-sm'>
			<div className='flex flex-col gap-sm'>
				<div className='flex items-end gap-1'>
					<Typography
						variant='h6'
						className='text-base-0'
					>
						{reviewsTotalScore}
					</Typography>
					<Typography
						variant='h7'
						className='text-base-60'
					>
						из
					</Typography>
					<Typography
						variant='h7'
						className='text-base-60'
					>
						{allReviews?.length}
					</Typography>
				</div>
				<div className='flex justify-between'>
					<Rating rating={reviewsTotalScore} />
					<WriteReviewForm tourId={id} />
				</div>
			</div>
			<ul className='flex flex-col gap-sm'>
				{Object.keys(totalStars)
					.reverse()
					.map((key) => (
						<ReviewStatisticItem
							key={key}
							count={totalStars[key as unknown as keyof typeof totalStars]}
							number={key as unknown as number}
							totalCount={allReviews?.length || 0}
						/>
					))}
			</ul>
		</div>
	) : null
}
