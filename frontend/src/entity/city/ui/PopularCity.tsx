import { Typography } from "@share/ui/Text"
import { getTranslations } from "next-intl/server"
import { Image } from "@share/ui/Image"
import Link from "next/link"
import type { FC } from "react"
import type { z } from "zod"
import type { cityItemSchema } from "../consts/schema"

type PopularCityProps = Pick<z.infer<typeof cityItemSchema>, "name" | "slug" | "photo" | "photo_alt" | "tour_count">

export const PopularCity: FC<PopularCityProps> = async (props) => {
	const t = await getTranslations()

	return (
		<li className='relative h-[140px] w-full overflow-hidden rounded-md bg-base-170'>
			<div className='absolute top-0 left-0 h-full w-full'>
				<Image
					src={props.photo}
					alt={t("components.popularCities.imageAlt", { city: props.name })}
					width={300}
					height={300}
					className='w-full object-cover object-center'
				/>
			</div>
			<div className='absolute right-0 bottom-0 left-0 flex h-full flex-col justify-between gap-sm p-md'>
				<Typography
					variant='h3'
					as='h3'
					textTransform='uppercase'
					textWidth='semibold'
					className='inline text-base-180 shadow-sm drop-shadow-primary'
				>
					{props.name}
				</Typography>
				<Typography
					variant='contentLarge'
					className='inline text-base-160 drop-shadow-primary'
				>
					{t("components.popularCities.tourCount", { count: props.tour_count || 0 })}
				</Typography>
			</div>
			<Link
				href={`/${props.slug}`}
				className='absolute top-0 right-0 bottom-0 left-0'
				aria-label={t("components.popularCities.linkToCity", { city: props.name })}
			/>
		</li>
	)
}
