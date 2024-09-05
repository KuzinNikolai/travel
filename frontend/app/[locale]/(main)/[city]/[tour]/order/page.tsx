import { getDetailTour, getTours } from "@entity/tour"
import { OrderTour } from "@pages/OrderTour"
import type { PagesProps } from "@share/lib"

export default async function OrderTourPage({ params }: PagesProps<{ locale: string; tour: string }>) {
	return <OrderTour />
}

export async function generateStaticParams() {
	const tours = await getTours()
	const arrayDetailTours = Promise.all(tours.map(async (tour) => await getDetailTour(tour.slug)))
	return (await arrayDetailTours).map((tour) => ({ tour: tour?.slug }))
}
