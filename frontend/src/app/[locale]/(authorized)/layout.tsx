import { defender } from "@share/packages/auth"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

export default async function AuthorizedLayout({ children }: PropsWithChildren) {
	const isAuthorized = await defender.isAuthorized()

	if (!isAuthorized) {
		notFound()
	}

	return children
}
