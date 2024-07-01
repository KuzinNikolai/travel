import clsx from "clsx"
import type { FC } from "react"
import { Icon } from "../../Icon"
import { RatingSkeleton } from "./RatingSkeleton"

interface IRatingProps {
	rating: number
}

export const Rating: FC<IRatingProps> & { Skeleton: typeof RatingSkeleton } = ({ rating }) => {
	return (
		<div className='flex items-center gap-1'>
			<label className='sr-only'>{rating}</label>

			{new Array(5).fill(0).map((_, index) => (
				<Icon
					key={index}
					name='Star'
					aria-hidden
					className={clsx("h-5 w-5 stroke-[2px] stroke-star", index < Math.round(rating) ? "fill-star" : "fill-none")}
				/>
			))}
		</div>
	)
}

Rating.Skeleton = RatingSkeleton
