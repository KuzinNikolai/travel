import { Defender } from "@share/packages/auth"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"
import { UserProvider } from "./profile/_middleware/GetUser"

export default async function AuthorizedLayout({ children }: PropsWithChildren) {
	const clientCookies = cookies()

	const { isAuthorized } = new Defender(clientCookies)

	if (!await isAuthorized()) {
		notFound()
	}

	return <UserProvider>{children}</UserProvider>
}
