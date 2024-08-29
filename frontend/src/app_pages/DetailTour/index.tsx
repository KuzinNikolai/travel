import { getDetailTour } from "@entity/tour"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import type { FC } from "react"
import { Header } from "./components/Header"
import { PreviewReviews } from "./components/PreviewReviews"
import { PreviewTour } from "./components/PreviewTour"
import { PreviewTourImages } from "./components/PreviewTourImages"
import { TourDescription } from "./components/TourDescriptions"
import { TourIncluded } from "./components/TourIncluded"
import { TourInformation } from "./components/TourInformation"
import { ToutPrograms } from "./components/TourPrograms"
import { TourTake } from "./components/TourTake"
import { TourUsagePolicy } from "./components/TourUsagePolicy"

interface DetailTourProps {
	tourSlug: string
}

export const DetailTour: FC<DetailTourProps> = async ({ tourSlug }) => {
	const t = await getTranslations()

	const tour = await getDetailTour(tourSlug)

	if (!tour) {
		return notFound()
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
							programs={tour.programs}
							currency_prefix={tour.currency_prefix}
							slug={tour.slug}
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
