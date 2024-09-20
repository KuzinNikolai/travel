import { Defender } from "@share/packages/auth"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export async function BecomeFormLayout() {
	const clientCookies = cookies()

	const { isAuthorized, isStaff } = new Defender(clientCookies)

	const isNotAuthorized = !await isAuthorized()

	if (isNotAuthorized || await isStaff()) {
		notFound()
	}
	
	return null
}