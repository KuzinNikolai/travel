"use client"

import { useWishlistStore } from "@feature/wishlist"
import { cn } from "@share/lib"
import { IconButton } from "@share/ui/Buttons"
import type { FC } from "react"

interface TourWishListButtonProps {
	tourId: number
}

export const TourWishListButton: FC<TourWishListButtonProps> = ({ tourId }) => {
	const wishlist = useWishlistStore()

	const onToggleInWishList = () => {
		if (wishlist.isFavoriteTour(tourId)) {
			wishlist.removeTour(tourId)
		} else {
			wishlist.addTour(tourId)
		}
	}

	return (
		<IconButton
			icon='Heart'
			description={wishlist.isFavoriteTour(tourId) ? "Удалить из избранного" : "Добавить в избранное"}
			onClick={onToggleInWishList}
			className='absolute top-2 left-2 flex items-center justify-center'
			iconProps={{ className: cn(wishlist.tours.includes(tourId) ? "stroke-primary-70 fill-primary-70" : "") }}
		/>
	)
}
