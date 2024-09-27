import type { PropsWithChildren } from "react"
import { ClientProvider } from "./ClientProvider"
import { defender } from "@share/packages/auth"

export async function UserProvider({ children }: PropsWithChildren) {
	const user = await defender.getUser()

	return <ClientProvider user={user || null}>{children}</ClientProvider>
}
