import type { PagesProps } from "@share/lib"
import type { PropsWithChildren } from "react"
import { i18n } from "./modules/i18n"
import { Query } from "./modules/ReactQuery"

export function Providers({ children, params, searchParams }: PropsWithChildren<PagesProps<{ locale: string }>>) {
	return (
		<Query.Provider>
			<i18n.Provider
				params={params}
				searchParams={searchParams}
			>
				{children}
			</i18n.Provider>
		</Query.Provider>
	)
}
