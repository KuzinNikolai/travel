import { siteConfig } from "@app/configs/siteConfig"
import { getLang } from "@app/provider/modules/i18n/getLang"
import type { PagesProps } from "@share/types"
import type { Metadata } from "next"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { Advantages } from "./_components/Advantages"
import { Header } from "./_components/Header"
import { PopularCities } from "./_components/PopularCities"
import { PopularTours } from "./_components/PopularTours"
import { i18nConfig } from "@share/i18n"

export const revalidate = 1600 // in seconds
export const fetchCache = "force-cache"

export default async function MainPage({ params }: PagesProps) {
	unstable_setRequestLocale(params.locale)

	return (
		<>
			<Header />
			<main className='flex flex-col gap-3'>
				<PopularCities />
				<Advantages />
				<PopularTours />
				<div className='h-[10px] bg-background-400' />
			</main>
		</>
	)
}

export async function generateMetadata({ params }: PagesProps): Promise<Metadata> {
	const { lang } = await getLang(params.locale)
	const t = await getTranslations()

	return {
		title: t("pages.mainPage.title"),
		description: t("pages.mainPage.description"),
		robots: {
			index: true,
			"max-image-preview": "standard",
			follow: true,
		},
		category: t("pages.mainPage.category"),
		creator: siteConfig.creator,
		keywords: t("pages.mainPage.keywords"),
		alternates: {
			canonical: "/",
			languages: Object.fromEntries(i18nConfig.locales.map((locale) => [`/${locale}`, `/${locale}`])),
		},
		openGraph: {
			type: "website",
			url: "https://gettrip.ru",
			title: t("pages.mainPage.title"),
			description: t("pages.mainPage.description"),
			siteName: siteConfig.name,
			locale: lang,
		},
	}
}

export async function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }))
}
