import { getDetailTour } from "@entity/tour"
import { notFound } from "next/navigation"
import type { FC } from "react"
import { Header } from "./components/Header"
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
	const tour = await getDetailTour(tourSlug)

	if (!tour) {
		return notFound()
	}

	return (
		<>
			<Header tourId={tour.id} />
			<section>
				<PreviewTourImages
					photos={tour.photos}
					alt={tour.photo_alt}
				/>
				<div className='flex flex-col gap-md'>
					<PreviewTour {...tour} />
					<TourDescription description={tour.description} />
					<TourInformation {...tour} />
					{tour.programs.length && (
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
				</div>
			</section>
		</>
	)
}
