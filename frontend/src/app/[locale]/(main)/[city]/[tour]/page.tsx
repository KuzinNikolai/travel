import { getDetailTour } from "@entity/tour"
import type { PagesProps } from "@share/types"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { Header } from "./_components/Header"
import { PreviewTourImages } from "./_components/PreviewTourImages"
import { PreviewReviews } from "./_components/PreviewReviews"
import { PreviewTour } from "./_components/PreviewTour"
import { TourDescription } from "./_components/TourDescriptions"
import { TourIncluded } from "./_components/TourIncluded"
import { TourInformation } from "./_components/TourInformation"
import { ToutPrograms } from "./_components/TourPrograms"
import { TourTake } from "./_components/TourTake"
import { TourUsagePolicy } from "./_components/TourUsagePolicy"
import { isErrorResponse } from "@share/packages/fetcher"

export default async function DetailTourPage({ params }: PagesProps) {
	const t = await getTranslations()

	const tour = await getDetailTour(params.tour)

	if (isErrorResponse(tour)) {
		notFound()
	}

	return (
		<>
			<Header tourId={tour.id} />
			<section>
				<PreviewTourImages
					photos={tour.photos.map((photo) => photo.url)}
					alt={tour.photo_alt || t("pages.detailTour.previewTour.photoAlt")}
				/>
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
					<TourUsagePolicy usagePolicy={tour.usage_policy} />
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
