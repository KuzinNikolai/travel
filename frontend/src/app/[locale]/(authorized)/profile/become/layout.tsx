import { defender } from "@share/packages/auth"
import { redirect } from "next/navigation"
import type { PropsWithChildren } from "react"

export default async function BecomeFormLayout({ children }: PropsWithChildren) {
	const isStaff = await defender.isStaff()

	if (isStaff) {
		redirect(".")
	}

	return children
}
