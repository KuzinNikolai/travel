"use client"

import { useWishlistStore } from "@feature/wishlist"
import { cn, useScrollable } from "@share/lib"
import { IconButton, ShareButton } from "@share/ui/Buttons"
import { Container } from "@share/ui/Layout"
import { useRouter } from "next/navigation"
import { useEffect, useState, type FC } from "react"

interface IHeader {
	tourId: number
}

export const Header: FC<IHeader> = ({ tourId }) => {
	const wishlist = useWishlistStore()
	const router = useRouter()
	const [locationHref, setLocationHref] = useState("")
	const scrollable = useScrollable(10)

	useEffect(() => {
		setLocationHref(window.location.href)
	}, [])

	const onBack = () => router.push(".", { scroll: false })

	const onToggleInWishList = () => {
		if (wishlist.isFavoriteTour(tourId)) {
			wishlist.removeTour(tourId)
		} else {
			wishlist.addTour(tourId)
		}
	}

	return (
		<div
			className={cn(
				"fixed top-0 right-0 left-0 z-20 py-2 transition-all duration-500",
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
						iconProps={{ className: wishlist.tours.includes(tourId) ? "stroke-accent fill-accent" : "" }}
						onClick={onToggleInWishList}
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
