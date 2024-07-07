import { PopularCity, getCities } from "@entity/city"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"

export const PopularCities = async () => {
	const cities = await getCities()

	return (
		<Section title='Популярные города'>
			<ul className='flex list-none flex-col gap-2'>
				{cities?.length ? (
					cities.map((city) => (
						<PopularCity
							key={city.id}
							{...city}
						/>
					))
				) : (
					<Typography variant='content1'>Cities not found</Typography>
				)}
			</ul>
		</Section>
	)
}
