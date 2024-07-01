import { BackHeader } from "@/components/Headers/BackHeader"
import { Tour } from "@/components/share/Tour"
import { getDetailCity } from "@/packages/API/fetches/cities"
import type { IPagesProps } from "@/packages/utilsTypes/nextFilesProps"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { FC } from "react"

const ToursInCity: FC<IPagesProps<{ city: string }>> = async ({ params }) => {
	const city = await getDetailCity(params.city)

	if (!city) {
		return notFound()
	}

	return (
		<div className='flex flex-col gap-3'>
			{/* <JsonLD schema={generateToursJsonLd(cityDetail)} /> */}
			<section className='flex h-full w-full flex-col bg-background-400'>
				<BackHeader title={`Экскурсии в ${city.name}`} />
				<div className='container flex flex-col gap-4 pb-5'>
					-- filter --
					{city?.tours.map((tour) => (
						<Tour
							key={tour.id + tour.slug}
							tour={tour}
						/>
					))}
				</div>
			</section>
			<div className='h-[10px] w-full bg-background-400' />
		</div>
	)
}

export default ToursInCity

export async function generateMetadata({ params }: IPagesProps): Promise<Metadata> {
	if (!params.slug) {
		return {}
	}

	const city = await getDetailCity(params.slug)

	if (!city) {
		return {}
	}

	return {
		title: `Экскурсии в городе ${city.title}`,
		description: city.description || "",
		keywords: `Экскурсии в ${city.title}, ${city.title}, Город ${city.title}`,
	}
}
