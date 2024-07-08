import { getCities } from "@entity/city"
import type { Tour } from "@entity/tour"
import { TourPreview } from "@entity/tour"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"

export const PopularTours = async () => {
	const tours = (await getCities())?.reduce((acc, city) => (acc.push(...city.popular_tours), acc), [] as Tour[])

	return (
		<Section title='Популярные туры'>
			<ul className='flex list-none flex-col gap-3'>
				{tours?.length ? (
					tours.map((tour) => (
						<TourPreview
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
