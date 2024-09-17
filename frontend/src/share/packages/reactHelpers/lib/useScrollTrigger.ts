import { useEffect, useState } from "react"

/**
 * @description
 * Hook that checks if the window has been scrolled beyond the given height.
 *
 * @param {number} hight - The height in pixels to check against
 * @returns {boolean} - True if the window has been scrolled beyond the given height, false otherwise
 */
export function useScrollTrigger(hight: number) {
	const [isScrollable, setScrollable] = useState(false)

	useEffect(() => {
		let lastY = window.screenTop

		const setScrollableStatus = () => {
			const isOverflowHidden = !!document.body.style.top.length

			if (isOverflowHidden ? lastY > hight : window.scrollY > hight) {
				setScrollable(true)
			} else {
				setScrollable(false)
			}

			lastY = window.screenTop
		}

		setScrollableStatus()
		window.addEventListener("scroll", setScrollableStatus)
		return () => window.removeEventListener("scroll", setScrollableStatus)
	}, [hight])

	return isScrollable
}
