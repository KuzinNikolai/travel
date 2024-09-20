import { getDetailCity } from "@entity/city"
import { TourPreviewCard } from "@entity/tour"
import { isErrorResponse } from "@share/packages/fetcher"
import type { PagesProps } from "@share/types"
import { Container, Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import type { Metadata } from "next"
import { getLocale, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"


export default async function ToursInCityPage({ params }: PagesProps<{ city: string }>) {
	const t = await getTranslations()
	const locale = await getLocale()

	const city = await getDetailCity(params.city, locale)

	if (isErrorResponse(city)) {
		notFound()
	}

	return (
		<>
			<HeaderWithBack title={t("pages.cityTours.title", { city: city.name })} />
			<main>
				<Section className='flex h-full w-full flex-col'>
					<Container className='flex flex-col gap-md pb-md'>
						-- filter --
						<div className='flex flex-col gap-sm'>
							{city.tours.length > 0 ? (
								city.tours.map((tour) => (
									<TourPreviewCard
										key={tour.id + tour.slug}
										tour={tour}
									/>
								))
							) : (
								<Typography variant='h3'>{t("pages.cityTours.emptyTours", { city: city.name })}</Typography>
							)}
						</div>
					</Container>
				</Section>
			</main>
		</>
	)
}

export async function generateMetadata({ params }: PagesProps): Promise<Metadata> {
	const city = await getDetailCity(params.city)

	if (isErrorResponse(city)) {
		return {}
	}

	return {
		title: `Экскурсии в городе ${city.name}`,
		description: city.description || "",
		keywords: `Экскурсии в ${city.name}, ${city.name}, Город ${city.name}`,
	}
}
