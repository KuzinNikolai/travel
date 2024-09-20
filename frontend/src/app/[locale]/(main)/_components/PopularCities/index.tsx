import { PopularCity, getPopularCities } from "@entity/city"
import { isErrorResponse } from "@share/packages/fetcher"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { getLocale, getTranslations } from "next-intl/server"

export async function PopularCities() {
	const t = await getTranslations()
	const lang = await getLocale()

	const cities = await getPopularCities(lang)

	return (
		<Section title={t("pages.mainPage.popularTours.title")}>
			<ul className='flex list-none flex-col gap-2'>
				{!isErrorResponse(cities) && cities?.length ? (
					cities.map((city) => (
						<PopularCity
							key={city.id}
							{...city}
						/>
					))
				) : (
					<Typography variant='contentPrimary'>{t("pages.mainPage.popularTours.emptyTours")}</Typography>
				)}
			</ul>
		</Section>
	)
}
