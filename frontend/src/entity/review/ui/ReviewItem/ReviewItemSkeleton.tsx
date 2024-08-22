import { Rating } from "@share/ui/Rating"
import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

export const ReviewItemSkeleton = () => (
	<div className='flex flex-col gap-sm border-base-140 border-b pb-md last-of-type:border-b-0 last-of-type:pb-none'>
		<div className='flex items-start gap-sm'>
			<Skeleton className='h-12 w-12 rounded-full' />
			<div className='flex flex-col gap-1'>
				<Skeleton className='h-12 w-24' />
				<Rating rating={0} />
				<div className='flex gap-sm'>
					<Skeleton className='h-12 w-20' />
					<Skeleton className='h-12 w-12' />
				</div>
			</div>
		</div>
		<div className='flex flex-col gap-sm'>
			<Skeleton className='h-12 w-full' />
			<Skeleton className='h-12 w-full' />
			<Skeleton className='h-12 w-full' />
		</div>
	</div>
)
