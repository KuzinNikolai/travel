"use client"

import { useUser } from "@entity/user"
import { useRouter } from "next/navigation"
import { type PropsWithChildren, useEffect } from "react"

export function UserProvider({ children }: PropsWithChildren) {
	const { isAuthorized } = useUser()
	const { replace } = useRouter()

	// useEffect(() => {
	// 	if (!isAuthorized) {
	// 		replace("/")
	// 	}
	// }, [isAuthorized, replace])

	return isAuthorized ? children : null
}
