"use client"

import emptyCart from "@assets/img/empty-cart.png"
import type { Tour } from "@entity/tour"
import { TourPreview } from "@entity/tour"
import { useWishlistStore } from "@feature/wishlist"
import { useStore } from "@share/lib"
import { Typography } from "@share/ui/Text"
import Image from "next/image"
import type { FC } from "react"

interface IListProps {
	tours: Tour[]
}

export const List: FC<IListProps> = ({ tours }) => {
	const OrderTours = useStore(useWishlistStore, (store) => store.tours)

	const filteredTours = tours.filter((tour) => OrderTours?.find((tourId) => tour.id === tourId))

	if (OrderTours === null) {
		return (
			<div className='flex flex-col gap-4'>
				{Array.from({ length: 5 }, (_, i) => (
					<TourPreview.Skeleton key={i} />
				))}
			</div>
		)
	}

	return OrderTours.length ? (
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
				alt='Изображение отображающее отсутствие заказов'
			/>
			<Typography variant='h2'>Упс! Отсутствуют заказы!</Typography>
			<Typography variant='content2'>Похоже, вы еще не заказывали ни одного тура.</Typography>
		</div>
	)
}
