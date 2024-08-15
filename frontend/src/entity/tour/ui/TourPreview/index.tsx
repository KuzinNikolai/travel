import { cn } from "@share/lib"
import { Image } from "@share/ui/Image"
import { Rating } from "@share/ui/Rating"
import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import clsx from "clsx"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import type { FC } from "react"
import type { Tour as TTour } from "../../consts"
import { TourWishListButton } from "./TourWishListButton"

interface TourProps {
	tour: TTour
}

export const TourPreview: FC<TourProps> & { Skeleton: typeof TourSkeleton } = async ({ tour }) => {
	const t = await getTranslations()

	const pathToTour = `/${tour.city_slug}/${tour.slug}`

	return (
		<li
			className={clsx(
				"grid w-full grid-cols-[130px_1fr] gap-sm",
				"after:col-span-2 after:block after:h-[1px] after:w-full after:bg-base-140",
			)}
		>
			<div className='relative'>
				<Image
					src={tour.photo}
					alt={t("components.popularTours.imgAlt", { name: tour.title })}
					width={137}
					height={137}
					className='h-full min-h-48 w-full rounded-sm object-cover object-center'
				/>
				<Link
					href={pathToTour}
					aria-label={t("components.popularTours.link", { name: tour.title })}
					className='absolute top-0 right-0 bottom-0 left-0'
				/>
				<TourWishListButton tourId={tour.id} />
			</div>
			<div className='flex flex-1 flex-col gap-2'>
				<div className='flex flex-row flex-wrap items-center justify-between gap-x-2'>
					<Typography
						variant='contentPrimary'
						as='span'
						textWidth='light'
						textTransform='uppercase'
						className='text-primary-400'
					>
						{tour.type}
					</Typography>
					<Typography
						variant='contentPrimary'
						as='span'
						textWidth='normal'
						className='text-primary-400'
					>
						{tour.duration}
					</Typography>
				</div>
				<Link href={pathToTour}>
					<Typography
						variant='h6'
						as='h3'
						textWidth='semibold'
						className='line-clamp-2 flex'
					>
						{tour.title}
					</Typography>
				</Link>
				<Typography
					variant='contentPrimary'
					textWidth='light'
					className='line-clamp-3 flex-1 text-primary-400 leading-5'
				>
					{tour.meta_desc}
				</Typography>
				<div className='flex flex-row justify-between'>
					<Rating rating={tour.average_rating} />
					<Typography
						variant='contentPrimary'
						textWidth='light'
						className='text-primary-400'
					>
						{tour.currency_prefix} {tour.min_price || 0}
					</Typography>
				</div>
			</div>
		</li>
	)
}

const TourSkeleton = () => (
	<div
		className={cn(
			"grid w-full grid-cols-[137px_1fr] gap-4",
			"after:col-span-2 after:block after:h-[1px] after:w-full after:bg-base-140",
		)}
	>
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
