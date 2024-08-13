import { PopularCity, getCities } from "@entity/city"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { getTranslations } from "next-intl/server"

export const PopularCities = async () => {
	const t = await getTranslations()

	const cities = await getCities()

	return (
		<Section title={t("pages.mainPage.popularTours.title")}>
			<ul className='flex list-none flex-col gap-2'>
				{cities?.length ? (
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
