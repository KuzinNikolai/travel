"use client"

import { useUser } from "@entity/user"
import type { FC, PropsWithChildren } from "react"

const Layout: FC<PropsWithChildren> = ({ children }) => {
	useUser()
	return <>{children}</>
}

export default Layout
