import { getDetailTour, getTours } from "@entity/tour"
import { DetailTour } from "@pages/DetailTour"
import type { PagesProps } from "@share/lib"
import type { Metadata } from "next"
import { unstable_setRequestLocale } from "next-intl/server"

export const revalidate = 3200 // 1 hour
export const dynamicParams = true

export default async function DetailTourPage({ params }: PagesProps<{ locale: string; city: string; tour: string }>) {
	unstable_setRequestLocale(params.locale)
	return <DetailTour tourSlug={params.tour} />
}

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

export async function generateStaticParams() {
	const tours = await getTours()
	const arrayDetailTours = Promise.all(
		tours.map(async (tour) => {
			const detailTour = await getDetailTour(tour.slug)
			return detailTour
		}),
	)

	return (await arrayDetailTours).map((tour) => ({ city: tour?.city_slug, tour: tour?.slug }))
}
