import { useEffect, useState } from "react"
import { useWishlistStore } from "../model/store"

export function useTourOnUserWishlist(tourId: number) {
	const wishlist = useWishlistStore()
	const [inWishlist, setInWishlist] = useState(false)

	useEffect(() => {
		if (!wishlist.isFavoriteTour(tourId)) return
		setInWishlist(true)
	}, [tourId, wishlist])

	return inWishlist
}
