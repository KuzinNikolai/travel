import { getDetailTour } from "@entity/tour"
import { DetailTour } from "@pages/DetailTour"
import type { PagesProps } from "@share/lib"
import type { Metadata } from "next"
import type { FC } from "react"

const DetailTourPage: FC<PagesProps<{ tour: string }>> = async ({ params }) => {
	return <DetailTour tourSlug={params.tour} />
}

export default DetailTourPage

export async function generateMetadata({ params }: PagesProps): Promise<Metadata> {
	const tour = await getDetailTour(params.tour)

	if (!tour) {
		return {}
	}

	return {
		title: `Экскурсия ${tour.title} в городе ${tour.city}`,
		description: tour.description || "",
		keywords: `Экскурсии ${tour.title}, ${tour.title}`,
	}
}
