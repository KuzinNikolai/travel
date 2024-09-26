import { Icon } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

interface ReviewStatisticItemProps {
	number: number
	totalCount: number
	count: number
}

export const ReviewStatisticItem: FC<ReviewStatisticItemProps> = ({ count, number, totalCount }) => {
	return (
		<li className='flex items-center gap-sm'>
			<Typography className='text-base-20'>{number}</Typography>
			<Icon
				name='Star'
				className='h-6 w-6 fill-trinity-gold stroke-none'
			/>
			<div className='relative h-2 w-full flex-1 rounded-md bg-base-140'>
				<div
					className='absolute h-full rounded-md bg-primary-80'
					style={{ width: `${(count / totalCount) * 100 || 0}%` }}
				/>
			</div>
			<Typography className='text-base-0'>{count}</Typography>
		</li>
	)
}
