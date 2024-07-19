import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { getDetailCity } from "@entity/city"
import { TourPreview } from "@entity/tour/ui/TourPreview"
import { logger, type PagesProps } from "@share/lib"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { FC } from "react"
import { Typography } from "@share/ui/Text"

const ToursInCity: FC<PagesProps<{ city: string }>> = async ({ params }) => {
	const city = await getDetailCity(params.city)

	if (!city) {
		return notFound()
	}

	return (
		<div className='flex flex-col gap-3'>
			{/* <JsonLD schema={generateToursJsonLd(cityDetail)} /> */}
			<section className='flex h-full w-full flex-col bg-background-400'>
				<HeaderWithBack title={`Экскурсии в ${city.name}`} />
				<div className='container flex flex-col gap-4 pb-5'>
					-- filter --
					{city.tours.length > 0 ? (
						city.tours.map((tour) => (
							<TourPreview
								key={tour.id + tour.slug}
								tour={tour}
							/>
						))
					) : (
						<Typography
							variant='h3'
							as='p'
						>
							В этом городе еще нет экскурсий
						</Typography>
					)}
				</div>
			</section>
			<div className='h-[10px] w-full bg-background-400' />
		</div>
	)
}

export default ToursInCity

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
