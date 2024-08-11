import { siteConfig } from "@app/configs/siteConfig"
import { i18nConfig, i18nUtils } from "@app/i18n"
import { inter } from "@assets/fonts"
import "@assets/globals.css"
import * as ReactQueryClientV2 from "@serverActions"
import { cn, type PagesProps } from "@share/lib"
import { Toaster } from "@share/ui/Popups"
import type { Metadata } from "next"
import * as i18n from "next-intl"
import { getMessages } from "next-intl/server"
import type { FC, PropsWithChildren } from "react"

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
}

const RootLayout: FC<PropsWithChildren<PagesProps<{ locale: string }>>> = async ({ children, params }) => {
	const lang = i18nUtils.isValidLocale(params.locale) ? params.locale : i18nConfig.defaultLocale
	const messages = await getMessages({ locale: lang })

	return (
		<html lang={lang}>
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
				/>
			</head>
			<body className={cn(inter.className, "flex min-h-screen flex-col")}>
				<i18n.NextIntlClientProvider
					locale={lang}
					messages={messages}
				>
					<ReactQueryClientV2.Provider>
						<div className="flex h-full flex-1 flex-col">{children}</div>
						<Toaster />
					</ReactQueryClientV2.Provider>
				</i18n.NextIntlClientProvider>
			</body>
		</html>
	)
}

export default RootLayout
