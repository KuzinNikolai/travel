"use client"

import emptyCart from "@assets/img/empty-cart.png"
import type { Tour } from "@entity/tour"
import { TourPreview } from "@entity/tour"
import { useWishlistStore } from "@feature/wishlist"
import { useStore } from "@share/lib"
import { Typography } from "@share/ui"
import Image from "next/image"
import type { FC } from "react"

interface IListProps {
	tours: Tour[]
}

export const List: FC<IListProps> = ({ tours }) => {
	const wishlistTours = useStore(useWishlistStore, (store) => store.tours)

	const filteredTours = tours.filter((tour) => wishlistTours?.find((tourId) => tour.id === tourId))

	if (wishlistTours === null) {
		return (
			<div className='flex flex-col gap-4'>
				{Array.from({ length: 5 }, (_, i) => (
					<TourPreview.Skeleton key={i} />
				))}
			</div>
		)
	}

	return wishlistTours.length ? (
		filteredTours.map((tour) => (
			<TourPreview
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
			<Typography variant='h2'>Упс! Желаемых туров нет!</Typography>
			<Typography variant='content2'>Похоже, вы еще не добавляли туров.</Typography>
		</div>
	)
}
