import { siteConfig } from "@app/configs/siteConfig"
import { Providers } from "@app/provider"
import { getLang } from "@app/provider/modules/i18n/getLang"
import { inter } from "@assets/fonts"
import "@assets/globals.css"
import { cn, } from "@share/packages/tailwindHelpers"
import type { PagesProps } from "@share/types"
import { Toaster } from "@share/ui/Popups"
import { Auth } from "@widget/Auth"
import type { Metadata } from "next"
import { unstable_setRequestLocale } from "next-intl/server"
import type { PropsWithChildren } from "react"

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

export default async function RootLayout({ children, params, searchParams }: PropsWithChildren<PagesProps>) {
	const { lang } = await getLang(params.locale)
	unstable_setRequestLocale(params.locale)

	return (
		<html lang={lang}>
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
				/>
			</head>
			<body className={cn(inter.className, "flex min-h-screen flex-col")}>
				<Providers
					params={params}
					searchParams={searchParams}
				>
					<div className='flex h-full flex-1 flex-col'>{children}</div>
					<Auth />
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
