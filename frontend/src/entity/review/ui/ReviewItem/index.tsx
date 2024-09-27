import type { Review } from "@share/schemas"
import { Avatar } from "@share/ui/Avatar"
import { Rating } from "@share/ui/Rating"
import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import { format } from "date-fns"
import type { FC } from "react"
import { ReviewItemSkeleton } from "./ReviewItemSkeleton"

interface ReviewProps {
	review: Omit<Review, "translations">
}

export const ReviewItem: FC<ReviewProps> & { Skeleton: typeof ReviewItemSkeleton } = ({ review }) => {
	return (
		<div className='flex flex-col gap-sm'>
			<div className='flex items-start gap-sm'>
				<Avatar.Root className='flex h-12 w-12 items-center justify-center rounded-full'>
					<Avatar.Image
						alt={review.user_full_name}
						src={review.user_photo || undefined}
						className='object-cover'
					/>
					<Avatar.Fallback>
						<Skeleton className='h-full w-full' />
					</Avatar.Fallback>
				</Avatar.Root>
				<div className='flex flex-col gap-1'>
					<Typography>{review.user_full_name}</Typography>
					<Rating rating={review.rating} />
					<data>{format(review.created_date, "dd.MM.yyyy HH:mm")}</data>
				</div>
			</div>
			<Typography className='text-base-20'>{review.text}</Typography>
		</div>
	)
}
ReviewItem.Skeleton = ReviewItemSkeleton
