"use client"

import { useRef } from "react"

export function useHistory() {
	const forward = useRef(() => history.forward())
	const back = useRef(() => history.back())
	const go = useRef((step: number) => history.go(step))

	return {
		forward: forward.current,
		back: back.current,
		go: go.current,
	}
}
