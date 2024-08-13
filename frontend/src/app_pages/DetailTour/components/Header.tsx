"use client"

import { useWishlistStore } from "@feature/wishlist"
import { cn, useScrollable } from "@share/lib"
import { IconButton, ShareButton } from "@share/ui/Buttons"
import { Container } from "@share/ui/Layout"
import { useTranslations } from "next-intl"
import { useEffect, useState, type FC } from "react"

interface IHeader {
	tourId: number
}

export const Header: FC<IHeader> = ({ tourId }) => {
	const t = useTranslations()

	const wishlist = useWishlistStore()

	const [locationHref, setLocationHref] = useState("")
	const scrollable = useScrollable(10)

	useEffect(() => {
		setLocationHref(window.location.href)
	}, [])

	const onBack = () => window.history.back()
	const onToggleInWishList = () => {
		if (wishlist.isFavoriteTour(tourId)) {
			wishlist.removeTour(tourId)
		} else {
			wishlist.addTour(tourId)
		}
	}

	const inWishlist = wishlist.isFavoriteTour(tourId) ? t("components.wishlist.remove") : t("components.wishlist.add")

	return (
		<div
			className={cn(
				"fixed top-0 right-0 left-0 z-20 py-sm transition-all duration-500",
				scrollable ? "bg-gray-200/60 backdrop-blur-2xl" : "bg-white/0 backdrop-blur-0",
			)}
		>
			<Container className='flex items-center justify-between'>
				<IconButton
					icon='ChevronLeft'
					description={t("share.back")}
					onClick={onBack}
				/>
				<div className='flex items-center gap-2'>
					<IconButton
						icon='Heart'
						description={inWishlist}
						iconProps={{ className: wishlist.tours.includes(tourId) ? "stroke-primary-70 fill-primary-70" : "" }}
						onClick={onToggleInWishList}
					/>
					<ShareButton
						shareData={{ url: locationHref }}
						description={t("pages.detailTour.actions.share")}
					/>
				</div>
			</Container>
		</div>
	)
}
