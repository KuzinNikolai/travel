import { defender } from "@share/packages/auth"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

export async function BecomeFormLayout({ children }: PropsWithChildren) {
	const isStaff = await defender.isStaff()

	if (!isStaff) {
		notFound()
	}

	return children
}
