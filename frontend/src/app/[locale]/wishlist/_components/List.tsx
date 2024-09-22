"use client"

import emptyCart from "@assets/img/empty-cart.png"
import { TourPreviewCard } from "@entity/tour"
import { useWishlistStore } from "@feature/wishlist"
import type { Tour } from "@share/schemas"
import { Image } from "@share/ui/Image"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

interface ListProps {
	tours: Tour[]
}

export const List: FC<ListProps> = ({ tours }) => {
	const wishlistTours = useWishlistStore((store) => store.tours)

	const filteredTours = tours.filter((tour) => wishlistTours?.find((tourId) => tour.id === tourId))

	if (wishlistTours === null) {
		return (
			<div className='flex flex-col gap-4'>
				{Array.from({ length: 5 }, (_, i) => (
					<TourPreviewCard.Skeleton key={i} />
				))}
			</div>
		)
	}

	return wishlistTours.length ? (
		filteredTours.map((tour) => (
			<TourPreviewCard
				key={tour.id}
				tour={tour}
			/>
		))
	) : (
		<div className='-translate-y-2 flex h-fit flex-1 flex-col items-center justify-center gap-5'>
			<Image
				src={emptyCart.src}
				width={emptyCart.width}
				height={emptyCart.height}
				alt='Изображение отображающее пустая корзину'
			/>
			<Typography
				variant='h2'
				as='h2'
			>
				Упс! Желаемых туров нет!
			</Typography>
			<Typography>Похоже, вы еще не добавляли туров.</Typography>
		</div>
	)
}
