import { defender } from "@share/packages/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
	const isStaff = await defender.isStaff()

	if (isStaff) {
		redirect("/dashboard/orders")
	}

	return null
}
