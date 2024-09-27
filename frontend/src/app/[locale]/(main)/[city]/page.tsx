import { siteConfig } from "@app/configs/siteConfig"
import { getAllCities, getDetailCity } from "@entity/city"
import { TourPreviewCard } from "@entity/tour"
import { i18nConfig } from "@share/i18n"
import { isErrorResponse } from "@share/packages/fetcher"
import type { PagesProps } from "@share/types"
import { Container, Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import type { Metadata, ResolvingMetadata } from "next"
import { getLocale, getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

export const dynamicParams = true
export const revalidate = 3200 // in seconds
export const fetchCache = "force-cache"

export default async function ToursInCityPage({ params }: PagesProps) {
	unstable_setRequestLocale(params.locale)

	const t = await getTranslations()

	const city = await getDetailCity(params.city)

	if (isErrorResponse(city)) {
		notFound()
	}

	return (
		<>
			<HeaderWithBack title={t("pages.cityTours.title", { city: city.name })} />
			<main>
				<Section className='flex h-full w-full flex-col'>
					<Container className='flex flex-col gap-md pb-md'>
						-- filter --
						<div className='flex flex-col gap-sm'>
							{city.tours.length > 0 ? (
								city.tours.map((tour) => (
									<TourPreviewCard
										key={tour.id + tour.slug}
										tour={tour}
									/>
								))
							) : (
								<Typography variant='h3'>{t("pages.cityTours.emptyTours", { city: city.name })}</Typography>
							)}
						</div>
					</Container>
				</Section>
			</main>
		</>
	)
}

export async function generateStaticParams({ params }: Omit<PagesProps<{ locale: string }>, "searchParams">) {
	const cities = await getAllCities(params.locale)

	if (isErrorResponse(cities)) {
		return []
	}

	return cities.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: PagesProps, parent: ResolvingMetadata): Promise<Metadata> {
	const locale = await getLocale()
	const t = await getTranslations()

	const city = await getDetailCity(params.city)

	if (isErrorResponse(city)) {
		return {}
	}

	return {
		title: t("pages.cityTours.meta.title", { city: city.name }),
		description: city.description,
		category: t("pages.mainPage.category"),
		keywords: t("pages.cityTours.meta.keywords", { city: city.name }),
		alternates: {
			canonical: `/${locale}/${params.city}`,
			languages: Object.fromEntries(i18nConfig.locales.map((locale) => [`${locale}`, `/${locale}/${params.city}`])),
		},
		openGraph: {
			...(await parent).openGraph,
			type: "website",
			url: `${siteConfig.origin}/${params.city}`,
			ttl: 20,
			title: t("pages.mainPage.title"),
			description: t("pages.mainPage.description"),
			images: {
				url: city.photo || "",
				alt: city.photo_alt || "",
				width: 1200,
				height: 630,
			},
		},
	}
}
