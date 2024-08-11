import type { DetailTour } from "@entity/tour"
import { Container, Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { Rating } from "@share/ui/Rating"
import type { FC } from "react"
import { PreviewTourImages } from "./PreviewTourImages"

type PreviewTourProps = Pick<DetailTour, "title" | "meta_desc" | "currency_prefix" | "min_price" | "average_rating">

export const PreviewTour: FC<PreviewTourProps> = (props) => {
	return (
		<Section className='flex flex-col gap-m pb-md'>
			<Container className='flex flex-col gap-md'>
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
						Смотрите ниже что включено в цену
					</Typography>
				</div>
			</Container>
		</Section>
	)
}
