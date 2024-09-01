"use client"

import * as i18nIntl from "next-intl"
import type { PropsWithChildren } from "react"

export function ProviderClient(props: PropsWithChildren<{ lang: string; messages: i18nIntl.AbstractIntlMessages }>) {
	return (
		<i18nIntl.NextIntlClientProvider
			locale={props.lang}
			messages={props.messages}
		>
			{props.children}
		</i18nIntl.NextIntlClientProvider>
	)
}
