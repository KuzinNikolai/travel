"use client"

import { queryKeyFactory } from "@share/packages/serverActions"
import type { User } from "@share/schemas"
import { useQueryClient } from "@tanstack/react-query"
import { useLayoutEffect, type PropsWithChildren } from "react"

interface ProviderClientProps {
	user: User | null
}

export function ProviderClient({ children, user }: PropsWithChildren<ProviderClientProps>) {
	const queryClient = useQueryClient()

	useLayoutEffect(() => {
		if (user) {
			queryClient.setQueryData<User>(queryKeyFactory.user(), user)
		} else {
			queryClient.setQueryData(queryKeyFactory.user(), null)
		}
	}, [user, queryClient])

	return children
}
