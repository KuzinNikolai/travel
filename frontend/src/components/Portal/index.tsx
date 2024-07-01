"use client"

import { type PropsWithChildren, useEffect, useState, type FC } from "react"
import { createPortal } from "react-dom"

export const Portal: FC<PropsWithChildren> = ({ children }) => {
	const [_body, setBody] = useState<HTMLElement | null>(null)

	useEffect(() => {
		setBody(document.body)
	}, [])

	return _body && createPortal(children, _body, "portal-root")
}
