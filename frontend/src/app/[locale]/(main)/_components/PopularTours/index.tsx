import { getPopularCities } from "@entity/city"
import type { Tour } from "@entity/tour"
import { TourPreviewCard } from "@entity/tour"
import { isErrorResponse } from "@share/packages/fetcher"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { getLocale, getTranslations } from "next-intl/server"

export const PopularTours = async () => {
	const t = await getTranslations()
	const locale = await getLocale()

	const cities = await getPopularCities(locale)

	const tours = (isErrorResponse(cities) ? [] : cities)?.reduce(
		(acc, city) => (acc.push(...city.popular_tours), acc),
		[] as Tour[],
	)

	return (
		<Section title={t("pages.mainPage.popularTours.title")}>
			<ul className='flex list-none flex-col gap-3'>
				{tours?.length ? (
					tours.map((tour) => (
						<TourPreviewCard
							key={tour.id}
							tour={tour}
						/>
					))
				) : (
					<Typography variant='contentPrimary'>{t("pages.mainPage.popularTours.emptyTours")}</Typography>
				)}
			</ul>
		</Section>
	)
}
