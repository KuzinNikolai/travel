import type { PagesProps } from "@share/lib"
import type { PropsWithChildren } from "react"
import { i18n } from "./modules/i18n"
import { Query } from "./modules/ReactQuery"

interface ProvidersProps extends PagesProps {}

export function Providers({ children, params }: PropsWithChildren<ProvidersProps>) {
	return (
		<Query.Provider>
			<i18n.Provider params={params}>{children}</i18n.Provider>
		</Query.Provider>
	)
}
