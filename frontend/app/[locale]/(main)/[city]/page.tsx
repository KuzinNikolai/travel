import { getCities, getDetailCity } from "@entity/city"
import { ToursInCity } from "@pages/ToursInCity"
import type { PagesProps } from "@share/lib"
import type { Metadata } from "next"
import { unstable_setRequestLocale } from "next-intl/server"

export const revalidate = 3200 // 1 hour
export const dynamicParams = true

export default function ToursInCityPage({ params }: PagesProps<{ locale: string; city: string }>) {
	unstable_setRequestLocale(params.locale)
	return <ToursInCity citySlug={params.city} />
}

export async function generateMetadata({ params }: PagesProps): Promise<Metadata> {
	const city = await getDetailCity(params.city)

	if (!city) {
		return {}
	}

	return {
		title: `Экскурсии в городе ${city.name}`,
		description: city.description || "",
		keywords: `Экскурсии в ${city.name}, ${city.name}, Город ${city.name}`,
	}
}

export async function generateStaticParams() {
	const cities = await getCities()
	return cities.map((city) => ({ city: city.slug }))
}
