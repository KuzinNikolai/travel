import { Skeleton } from "@share/ui"

export const RatingSkeleton = () => {
	return (
		<div className='flex flex-row gap-1'>
			{new Array(5).fill(0).map((_, index) => (
				<Skeleton
					key={index}
					className='h-5 w-5'
				/>
			))}
		</div>
	)
}
