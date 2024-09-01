import type { PropsWithChildren } from "react"
import { ProviderClient } from "./ProviderClient"
import { getLang } from "./getLang"
import type { PagesProps } from "@share/lib"

export async function ProviderServer({ children, params }: PropsWithChildren<PagesProps<{ locale: string }>>) {
	const { lang, messages } = await getLang(params.locale)
	return (
		<ProviderClient
			lang={lang}
			messages={messages}
		>
			{children}
		</ProviderClient>
	)
}
