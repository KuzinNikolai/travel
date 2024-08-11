import { getDetailCity } from "@entity/city"
import { ToursInCity } from "@pages/ToursInCity"
import type { PagesProps } from "@share/lib"
import type { Metadata } from "next"

export default function ToursInCityPage({ params }: PagesProps<{ city: string }>) {
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
