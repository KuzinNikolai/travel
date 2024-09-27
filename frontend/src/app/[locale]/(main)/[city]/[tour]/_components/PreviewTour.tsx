import type { DetailTour } from "@share/schemas"
import { Section } from "@share/ui/Layout"
import { Rating } from "@share/ui/Rating"
import { Typography } from "@share/ui/Text"
import { getTranslations } from "next-intl/server"
import type { FC } from "react"

type PreviewTourProps = Pick<DetailTour, "title" | "meta_desc" | "currency_prefix" | "min_price" | "average_rating">

export const PreviewTour: FC<PreviewTourProps> = async (props) => {
	const t = await getTranslations()

	return (
		<Section>
			<Typography
				variant='h2'
				textWidth='semibold'
				as='h1'
			>
				{props.title}
			</Typography>

			<div className='flex flex-col gap-sm'>
				<Typography
					variant='contentPrimary'
					className='text-base-20'
				>
					{props.meta_desc}
				</Typography>
				<Rating rating={props.average_rating} />
				{props.min_price && (
					<Typography variant='h4'>
						{props.currency_prefix} {props.min_price}
					</Typography>
				)}
				<Typography
					variant='contentPrimary'
					className='text-secondary-40'
					as='span'
				>
					{t("pages.detailTour.previewTour.seeDown")}
				</Typography>
			</div>
		</Section>
	)
}
