import { siteConfig } from "@app/configs/siteConfig"
import { Providers } from "@app/provider"
import { getLang } from "@app/provider/modules/i18n/getLang"
import { inter } from "@assets/fonts"
import "@assets/globals.css"
import { i18nConfig } from "@share/i18n"
import { cn } from "@share/packages/tailwindHelpers"
import type { PagesProps } from "@share/types"
import { Toaster } from "@share/ui/Popups"
import { Auth } from "@widget/Auth"
import type { Metadata } from "next"
import { getLocale, getTranslations, unstable_setRequestLocale } from "next-intl/server"

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

interface RootLayoutProps {
	params: PagesProps["params"]
	children: React.ReactNode
}

export default async function RootLayout({ params, children }: RootLayoutProps) {
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
				<Providers params={params}>
					<div className='flex h-full flex-1 flex-col'>{children}</div>
					<Auth />
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations()
	const locale = await getLocale()

	return {
		title: {
			default: siteConfig.name,
			template: `%s - ${siteConfig.name}`,
		},
		description: t("meta.description"),
		abstract: t("meta.abstract"),
		keywords: t("meta.keywords"),
		robots: {
			index: true,
			follow: true,
		},
		openGraph: {
			type: "website",
			ttl: 10,
			alternateLocale: i18nConfig.locales.join(", "),
			locale,
			url: "/",
			siteName: siteConfig.name,
			title: siteConfig.name,
			description: siteConfig.description,
			images: [
				{
					url: "/logo.png",
					width: 256,
					height: 256,
					alt: siteConfig.name,
				},
			],
		},
		icons: {
			icon: "/favicon.ico",
		},
		category: "booking",
		referrer: "origin-when-cross-origin",
		creator: siteConfig.creator,
	}
}
