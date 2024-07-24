"use client"

import { useUser } from "@entity/user"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function BecomeGuideLayout({ children }: { children: React.ReactNode }) {
	const { query } = useUser()

	useEffect(() => {
		if (!query.isFetched || !query.data) return
		if (query.data.is_staff) redirect("/profile")
	}, [query.isFetched, query.data])

	return <>{children}</>
}
