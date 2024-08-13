"use client"

import { useWishlistStore } from "@feature/wishlist"
import { useTourOnUserWishlist } from "@feature/wishlist/lib/useTourOnUserWishlist"
import { cn } from "@share/lib"
import { IconButton } from "@share/ui/Buttons"
import { useTranslations } from "next-intl"
import { useLayoutEffect, useState, type FC } from "react"

interface TourWishListButtonProps {
	tourId: number
}

export const TourWishListButton: FC<TourWishListButtonProps> = ({ tourId }) => {
	const t = useTranslations("components.wishlist")

	const inWishlist = useTourOnUserWishlist(tourId)
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
			description={inWishlist ? t("remove") : t("add")}
			onClick={onToggleInWishList}
			className='absolute top-2 left-2 flex items-center justify-center'
			iconProps={{ className: cn(inWishlist ? "stroke-primary-70 fill-primary-70" : "") }}
		/>
	)
}
