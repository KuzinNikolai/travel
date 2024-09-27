import { siteConfig } from "@app/configs/siteConfig"
import { getDetailTour, getTours } from "@entity/tour"
import { sleep } from "@share/helpers"
import { i18nConfig } from "@share/i18n"
import { isErrorResponse } from "@share/packages/fetcher"
import type { PagesProps } from "@share/types"
import type { Metadata, ResolvingMetadata } from "next"
import { getLocale, getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Header } from "./_components/Header"
import { PreviewReviews } from "./_components/PreviewReviews"
import { PreviewTour } from "./_components/PreviewTour"
import { PreviewTourImages } from "./_components/PreviewTourImages"
import { TourDescription } from "./_components/TourDescriptions"
import { TourIncluded } from "./_components/TourIncluded"
import { TourInformation } from "./_components/TourInformation"
import { ToutPrograms } from "./_components/TourPrograms"
import { TourTake } from "./_components/TourTake"

export const dynamicParams = true
export const revalidate = 1600 // in seconds
export const fetchCache = "force-cache"

export default async function DetailTourPage({ params }: PagesProps) {
	unstable_setRequestLocale(params.locale)

	const tour = await getDetailTour(params.tour)

	if (isErrorResponse(tour)) {
		notFound()
	}

	return (
		<>
			<Header tourId={tour.id} />
			<section>
				<PreviewTourImages photos={tour.photos} />
				<div className='flex flex-col gap-md'>
					<PreviewTour {...tour} />
					<TourDescription description={tour.description} />
					<TourInformation {...tour} />
					{tour.programs.length > 0 && (
						<ToutPrograms
							id={tour.id}
							programs={tour.programs}
							currency_prefix={tour.currency_prefix}
						/>
					)}
					{tour.included.length || tour.notincluded.length ? (
						<TourIncluded
							included={tour.included}
							notincluded={tour.notincluded}
						/>
					) : null}
					{tour.take.length > 0 && <TourTake take={tour.take} />}
					{/* <TourUsagePolicy usagePolicy={tour.usage_policy} /> */}
					<PreviewReviews
						tour={{
							id: tour.id,
							title: tour.title,
							reviews: tour.reviews,
						}}
					/>
				</div>
			</section>
		</>
	)
}

export async function generateStaticParams({ params }: Omit<PagesProps<{ locale: string }>, "searchParams">) {
	const tours = await getTours(params.locale)

	if (isErrorResponse(tours)) {
		return []
	}

	const arrayDetailTours = await Promise.all(
		tours.map(async (tour) => {
			await sleep(300)

			const tourDetail = await getDetailTour(tour.slug)

			return isErrorResponse(tourDetail) ? null : tour
		}),
	)

	const tourSlugs = arrayDetailTours
		.filter((tour) => !!tour)
		.map((tour) => ({ locale: params.locale, city: tour.city, tour: tour.slug }))

	return tourSlugs
}

export async function generateMetadata({ params }: PagesProps, parent: ResolvingMetadata): Promise<Metadata> {
	const locale = await getLocale()
	const t = await getTranslations()

	const tour = await getDetailTour(params.tour)

	if (isErrorResponse(tour)) {
		return {}
	}

	return {
		title: t("pages.detailTour.meta.title", { tourName: tour.title, city: tour.city }),
		description: tour.meta_desc,
		category: t("pages.detailTour.meta.category"),
		keywords: t("pages.cityTours.meta.keywords", { tourName: tour.title, city: tour.city }),
		alternates: {
			canonical: `/${locale}/${params.city}`,
			languages: Object.fromEntries(
				i18nConfig.locales.map((locale) => [`${locale}`, `/${locale}/${tour.city_slug}/${tour.slug}`]),
			),
		},
		openGraph: {
			...(await parent).openGraph,
			type: "website",
			url: `${siteConfig.origin}/${params.locale}/${params.city}/${tour.slug}`,
			ttl: 30,
			title: t("pages.mainPage.title"),
			description: t("pages.mainPage.description"),
			images: [
				{
					url: tour.photo,
					alt: tour.photo_alt || "",
					width: 1200,
					height: 630,
				},
				...tour.photos.map((photo) => ({
					url: photo.image,
					alt: tour.photo_alt || "",
					width: 1200,
					height: 630,
				})),
			].filter(Boolean),
		},
	}
}
