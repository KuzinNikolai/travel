"use client"

import { useWishlistStore } from "@feature/wishlist"
import { cn } from "@share/lib"
import { IconButton } from "@share/ui/Buttons"
import type { FC } from "react"

interface ITourWishListButtonProps {
	tourId: number
}

export const TourWishListButton: FC<ITourWishListButtonProps> = ({ tourId }) => {
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
			onClick={onToggleInWishList}
			className='absolute top-2 left-2 flex items-center justify-center'
			iconProps={{ className: cn(wishlist.tours.includes(tourId) ? "stroke-accent fill-accent" : "") }}
		/>
	)
}
