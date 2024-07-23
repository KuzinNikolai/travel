"use client"

import { useGetCity } from "@entity/city"
import { useUser } from "@entity/user"
import { useEffect, type FC, type PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const { query: userQuery } = useUser()
	const { fetchRun: fetchCity } = useGetCity()

	useEffect(() => {
		if (!userQuery.isFetched || !userQuery.data?.city) return
		fetchCity(userQuery.data.city)
	}, [userQuery.isFetched, userQuery.data?.city, fetchCity])

	return <>{children}</>
}

export default Layout
