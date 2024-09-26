import { getDetailTour, getTours } from "@entity/tour"
import { sleep } from "@share/helpers"
import { isErrorResponse } from "@share/packages/fetcher"
import type { PagesProps } from "@share/types"
import type { Metadata } from "next"
import { unstable_setRequestLocale } from "next-intl/server"
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

export async function generateMetadata({ params }: PagesProps): Promise<Metadata> {
	const tour = await getDetailTour(params.tour)

	if (isErrorResponse(tour)) {
		return {}
	}

	return {
		title: `Экскурсия ${tour.title} в городе ${tour.city}`,
		description: tour.description || "",
		keywords: `Экскурсии ${tour.title}, ${tour.title}`,
	}
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
