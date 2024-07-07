import type { Tour } from "@entity/tour"
import { getCities } from "@entity/city"
import { TourPreview } from "@entity/tour"
import { Section, Typography } from "@share/ui"

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
