import { print } from "@share/packages/logger"
import { headers } from "next/headers"
import Link from "next/link"

export default async function NotFound() {
	const headersList = headers()
	const domain = headersList.get("host")

	print.debug("404:", domain)

	return (
		<div>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<Link href='/'>Return Home</Link>
		</div>
	)
}