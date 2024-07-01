import { Typography } from "@/components/Typography"
import { Section } from "@/components/layout/Section"
import { Tour } from "@/components/share/Tour"
import { serverApi } from "@/packages/API"
import type { ITour } from "@/packages/schemes/travel/tour.schema"

export const PopularTours = async () => {
	const tours = (await serverApi.cities.getCities())?.reduce(
		(acc, city) => (acc.push(...city.popular_tours), acc),
		[] as ITour[],
	)

	return (
		<Section title='Популярные туры'>
			<ul className='flex list-none flex-col gap-3'>
				{tours?.length ? (
					tours.map((tour) => (
						<Tour
							key={tour.id}
							tour={tour}
						/>
					))
				) : (
					<Typography variant='content1'>Tours not found</Typography>
				)}
			</ul>
		</Section>
	)
}
