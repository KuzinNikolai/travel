import type { PagesProps } from "@share/types"
import type { PropsWithChildren } from "react"
import { i18n } from "./modules/i18n"
import { Query } from "./modules/ReactQuery"
import { Auth } from "./modules/Auth"

interface ProvidersProps extends PagesProps {}

export function Providers({ children, params }: PropsWithChildren<ProvidersProps>) {
	return (
		<Query.Provider>
			<i18n.Provider params={params}>
				<Auth.Provider>{children}</Auth.Provider>
			</i18n.Provider>
		</Query.Provider>
	)
}
