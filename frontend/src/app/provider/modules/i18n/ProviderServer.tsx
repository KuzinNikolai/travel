import type { PagesProps } from "@share/lib"
import * as i18nIntl from "next-intl"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"
import { getLang } from "./getLang"

type ProviderServerProps = Omit<PagesProps, "searchParams">

export async function ProviderServer({ params, children }: PropsWithChildren<ProviderServerProps>) {
	if (!("locale" in params)) {
		notFound()
	}

	const { lang, messages } = await getLang(params.locale)
	return (
		<i18nIntl.NextIntlClientProvider
			locale={lang}
			messages={messages}
		>
			{children}
		</i18nIntl.NextIntlClientProvider>
	)
}
