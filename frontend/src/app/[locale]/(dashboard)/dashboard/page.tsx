import { Defender } from "@share/packages/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
	const clientCookies = cookies()

	const { isStaff } = new Defender(clientCookies)

	if (await isStaff()) {
		redirect("/dashboard/orders")
	}

	return null
}
