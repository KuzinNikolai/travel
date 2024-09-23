"use client"

import { queryKeyFactory } from "@share/packages/serverActions"
import type { User } from "@share/schemas"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, type FC, type PropsWithChildren } from "react"

interface UserProviderProps extends PropsWithChildren {
	user: User | null
}

export const ClientProvider: FC<UserProviderProps> = ({ user, children }) => {
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!user) {
			return
		}

		queryClient.setQueryData(queryKeyFactory.user(), user)
	}, [queryClient, user])

	return children
}
