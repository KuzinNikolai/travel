import { Rating } from "@share/ui/Rating"
import { Typography } from "@share/ui/Text"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import type { FC } from "react"
import type { Tour as TTour } from "../../consts"
import style from "./Tour.module.css"
import { TourWishListButton } from "./TourWishListButton"
import { Skeleton } from "@share/ui/Skeleton"
import { cn } from "@share/lib"

interface TourProps {
	tour: TTour
}

export const TourPreview: FC<TourProps> & { Skeleton: typeof TourSkeleton } = ({ tour }) => {
	const pathToTour = `/${tour.city_slug}/${tour.slug}`

	return (
		<li className={clsx("grid w-full grid-cols-[130px_1fr] gap-3", style["under-line"])}>
			<div className='relative'>
				<Image
					src={tour.photo}
					alt={tour.meta_desc}
					width={137}
					height={137}
					className='h-full w-full rounded object-cover object-center'
				/>
				<Link
					href={pathToTour}
					aria-label={`Ссылка на тур ${tour.title}`}
					className='absolute top-0 right-0 bottom-0 left-0'
				/>
				<TourWishListButton tourId={tour.id} />
			</div>
			<div className='flex flex-1 flex-col gap-2'>
				<div className='flex flex-row flex-wrap items-center justify-between gap-x-2'>
					<Typography
						variant='span'
						textWidth='light'
						textTransform='uppercase'
						className='text-primary-400'
					>
						{tour.type}
					</Typography>
					<Typography
						variant='span'
						textWidth='normal'
						className='text-primary-400'
					>
						{tour.duration}
					</Typography>
				</div>
				<Link href={pathToTour}>
					<Typography
						variant='h5'
						as='h3'
						textWidth='semibold'
					>
						{tour.title}
					</Typography>
				</Link>
				<Typography
					variant='content1'
					textWidth='light'
					className='line-clamp-4 flex-1 text-primary-400 leading-5'
				>
					{tour.meta_desc}
				</Typography>
				<div className='flex flex-row justify-between'>
					<Rating rating={tour.average_rating} />
					<Typography
						variant='span'
						textWidth='light'
						className='text-primary-400'
					>
						${tour.min_price || 0}
					</Typography>
				</div>
			</div>
		</li>
	)
}

const TourSkeleton = () => (
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
TourPreview.Skeleton = TourSkeleton
