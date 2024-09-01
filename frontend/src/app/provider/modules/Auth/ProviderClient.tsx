"use client"

import type { User } from "@entity/user"
import { queryKeyFactory } from "@share/serverActions/consts/queryKeyFactory"
import { useQueryClient } from "@tanstack/react-query"
import { useLayoutEffect, type PropsWithChildren } from "react"

interface ProviderClientProps {
	user: User | null
}

export function ProviderClient({ children, user }: PropsWithChildren<ProviderClientProps>) {
	const queryClient = useQueryClient()

	useLayoutEffect(() => {
		if (user) {
			queryClient.setQueryData<User>(queryKeyFactory.account(), user)
		} else {
			queryClient.setQueryData(queryKeyFactory.account(), null)
		}
	}, [user, queryClient])

	return children
}
