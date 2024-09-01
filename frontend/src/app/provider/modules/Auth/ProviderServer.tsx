import type { PropsWithChildren } from "react"
import { getUser } from "./getUser"
import { ProviderClient } from "./ProviderClient"

export async function ProviderServer({ children }: PropsWithChildren) {
	const user = await getUser()

	return <ProviderClient user={user ? user.user : null}>{children}</ProviderClient>
}
