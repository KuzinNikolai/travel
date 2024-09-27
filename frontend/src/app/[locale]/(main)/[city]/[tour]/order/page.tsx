import { getTours, getDetailTour } from "@entity/tour"
import { FormCreateOrder } from "@feature/order/createOrder"
import { sleep } from "@share/helpers"
import { isErrorResponse } from "@share/packages/fetcher"
import type { PagesProps } from "@share/types"
import { Section } from "@share/ui/Layout"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { unstable_setRequestLocale } from "next-intl/server"

export const dynamicParams = true
export const revalidate = 1600 // in seconds
export const fetchCache = "force-cache"

export default async function DetailTour({ params }: PagesProps) {
	unstable_setRequestLocale(params.locale)

	return (
		<>
			<HeaderWithBack title='Заказ экскурсии' />
			<Section className='h-full'>
				<FormCreateOrder />
			</Section>
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
