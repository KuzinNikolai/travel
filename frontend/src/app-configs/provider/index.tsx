import type { PagesProps } from "@share/types"
import type { PropsWithChildren } from "react"
import { Auth } from "./modules/Auth"
import { Query } from "./modules/ReactQuery"
import { i18n } from "./modules/i18n"

export function Providers({ children, params }: PropsWithChildren<Omit<PagesProps, "searchParams">>) {
	return (
		<Query.Provider>
			<i18n.Provider params={params}>
				<Auth.Provider>{children}</Auth.Provider>
			</i18n.Provider>
		</Query.Provider>
	)
}
