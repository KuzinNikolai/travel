import { getCities } from "@entity/city"
import type { Tour } from "@entity/tour"
import { TourPreview } from "@entity/tour"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { getTranslations } from "next-intl/server"

export const PopularTours = async () => {
	const t = await getTranslations()

	const tours = (await getCities())?.reduce((acc, city) => (acc.push(...city.popular_tours), acc), [] as Tour[])

	return (
		<Section title={t("pages.mainPage.popularTours.title")}>
			<ul className='flex list-none flex-col gap-3'>
				{tours?.length ? (
					tours.map((tour) => (
						<TourPreview
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
