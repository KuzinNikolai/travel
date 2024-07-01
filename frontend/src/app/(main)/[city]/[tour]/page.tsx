import { Section } from "@/components/layout/Section"
import { getDetailTour } from "@/packages/API/fetches/tours"
import type { IPagesProps } from "@/packages/utilsTypes/nextFilesProps"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { FC } from "react"
import { Header } from "./_components/Header"
import { PreviewTour } from "./_components/PreviewTour"
import { TourDescription } from "./_components/TourDescriptions"
import { TourIncluded } from "./_components/TourIncluded"
import { TourInformation } from "./_components/TourInformation"
import { ToutPrograms } from "./_components/TourPrograms"
import { TourTake } from "./_components/TourTake"
import { TourUsagePolicy } from "./_components/TourUsagePolicy"

const Tour: FC<IPagesProps<{ tour: string }>> = async ({ params }) => {
	const tour = await getDetailTour(params.tour)

	if (!tour) {
		return notFound()
	}

	return (
		<>
			<Header tourId={tour.id} />
			<Section
				title='Tour'
				hiddenTitle
			>
				<PreviewTour tour={tour} />
				<TourDescription description={tour.description} />
				<TourInformation tour={tour} />
				<ToutPrograms tour={tour} />
				<TourIncluded tour={tour} />
				<TourTake tour={tour} />
				<TourUsagePolicy usagePolicy={tour.usage_policy} />
			</Section>
		</>
	)
}

export default Tour

export async function generateMetadata({ params }: IPagesProps): Promise<Metadata> {
	if (!params.slug) {
		return {}
	}

	const tour = await getDetailTour(params.slug)

	if (!tour) {
		return {}
	}

	return {
		title: `Экскурсия ${tour.title} в городе ${tour.city}`,
		description: tour.description || "",
		keywords: `Экскурсии ${tour.title}, ${tour.title}`,
	}
}
