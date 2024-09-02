import { siteConfig } from "@app/configs/siteConfig"
import { i18nConfig } from "@app/i18n"
import { Providers } from "@app/provider"
import { getLang } from "@app/provider/modules/i18n/getLang"
import { inter } from "@assets/fonts"
import "@assets/globals.css"
import { cn, type PagesProps } from "@share/lib"
import { Toaster } from "@share/ui/Popups"
import { Auth } from "@widget/Auth"
import type { Metadata } from "next"
import { unstable_setRequestLocale } from "next-intl/server"
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

const RootLayout: FC<PropsWithChildren<PagesProps>> = async ({ children, params, searchParams }) => {
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
					<div className='flex h-full flex-1 flex-col'>
						{children}
						<Auth />
					</div>
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}

export default RootLayout

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }))
}