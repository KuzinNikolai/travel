import { Defender } from "@share/packages/auth"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

export default async function DashboardLayout({ children }: PropsWithChildren) {
	const clientCookies = cookies()

	const { isStaff } = new Defender(clientCookies)

	if (!isStaff()) {
		notFound()
	}

	return children
}
