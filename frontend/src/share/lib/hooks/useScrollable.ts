"use client"

import { useEffect, useState } from "react"

export function useScrollable(trigger: number) {
	const [isScrollable, setScrollable] = useState(false)

	useEffect(() => {
		let lastY = window.screenTop

		const setScrollableStatus = () => {
			const isOverflowHidden = !!document.body.style.top.length

			if (isOverflowHidden ? lastY > trigger : window.scrollY > trigger) {
				setScrollable(true)
			} else {
				setScrollable(false)
			}

			lastY = window.screenTop
		}

		setScrollableStatus()
		window.addEventListener("scroll", setScrollableStatus)
		return () => window.removeEventListener("scroll", setScrollableStatus)
	}, [])

	return isScrollable
}
