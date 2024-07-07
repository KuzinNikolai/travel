import { cn } from "@share/lib"
import { Rating, Skeleton } from "@share/ui"
import style from "./Tour.module.css"

export const TourSkeleton = () => (
	<div className={cn("grid w-full grid-cols-[137px_1fr] gap-4", style["under-line"])}>
		<Skeleton className='h-full' />
		<div className='flex flex-1 flex-col gap-3'>
			<div className='flex flex-row flex-wrap justify-between gap-x-2'>
				<Skeleton className='h-4 w-28' />
				<Skeleton className='h-4 w-12' />
			</div>
			<div className='flex flex-col gap-1'>
				<Skeleton className='h-[1.25rem] w-full' />
				<Skeleton className='h-[1.25rem] w-full' />
			</div>
			<div className='flex flex-row justify-between gap-4'>
				<Rating.Skeleton />
				<Skeleton className='line-clamp-4 h-5 w-full flex-1 text-primary-400' />
			</div>
		</div>
	</div>
)
