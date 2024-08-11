import { getDetailCity } from "@entity/city"
import { TourPreview } from "@entity/tour"
import { Container, Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { notFound } from "next/navigation"
import type { FC } from "react"

interface ToursInCityProps {
	citySlug: string
}

export const ToursInCity: FC<ToursInCityProps> = async ({ citySlug }) => {
	const city = await getDetailCity(citySlug)

	if (!city) {
		return notFound()
	}

	return (
		<div className='flex flex-col'>
			<HeaderWithBack title={`Экскурсии в ${city.name}`} />
			<Section className='flex h-full w-full flex-col'>
				<Container className='flex flex-col gap-md pb-md'>
					-- filter --
					<div className='flex flex-col gap-sm'>
						{city.tours.length > 0 ? (
							city.tours.map((tour) => (
								<TourPreview
									key={tour.id + tour.slug}
									tour={tour}
								/>
							))
						) : (
							<Typography variant='h3'>В этом городе еще нет экскурсий</Typography>
						)}
					</div>
				</Container>
			</Section>
			<div className='h-[10px] w-full bg-background-400' />
		</div>
	)
}
