"use client"

import { ShareButton } from "@/components/Buttons/ButtonShare"
import { IconButton } from "@/components/Buttons/IconButton"
import { Container } from "@/components/layout/Container"
import { useScrollable } from "@/packages/hooks/useScrollable"
import { useWishlistStore } from "@/packages/stores/wishlist"
import { cn } from "@/packages/tw-utils"
import { type FC, useEffect, useState } from "react"

interface IHeader {
	tourId: number
}

export const Header: FC<IHeader> = ({ tourId }) => {
	const wishlist = useWishlistStore()

	const [locationHref, setLocationHref] = useState("")
	const scrollable = useScrollable(10)

	useEffect(() => {
		setLocationHref(window.location.href)
	}, [])

	const onBack = () => window.history.back()
	const onWishList = () => {
		if (wishlist.isFavoriteTour(tourId)) {
			wishlist.removeTour(tourId)
		} else {
			wishlist.addTour(tourId)
		}
	}

	return (
		<div
			className={cn(
				"fixed top-0 right-0 left-0 py-2 transition-all duration-500",
				scrollable ? "bg-gray-200/60 backdrop-blur-2xl" : "bg-white/0 backdrop-blur-0",
			)}
		>
			<Container className='flex items-center justify-between'>
				<IconButton
					className='rounded-full bg-white p-1'
					icon='ChevronLeft'
					description='Назад'
					onClick={onBack}
				/>
				<div className='flex items-center gap-2'>
					<IconButton
						icon='Heart'
						description='Добавить экскурсию в список желаемого'
						iconProps={{
							className: wishlist.tours.includes(tourId) ? "stroke-accent fill-accent" : "",
						}}
						onClick={onWishList}
					/>
					<ShareButton
						shareData={{ url: locationHref }}
						description='Поделиться экскурсией'
					/>
				</div>
			</Container>
		</div>
	)
}
