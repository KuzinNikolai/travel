import { defender } from "@share/packages/auth"
import { redirect } from "next/navigation"
import type { PropsWithChildren } from "react"

export const dynamic = "force-dynamic"

export default async function AuthorizedLayout({ children }: PropsWithChildren) {
	const isAuthorized = await defender.isAuthorized()

	if (!isAuthorized) {
		redirect("/")
	}

	return children
}
