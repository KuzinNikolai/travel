import type { DetailTour } from "@entity/tour"
import { Container, Rating, Typography } from "@share/ui"
import type { FC } from "react"
import { PreviewTourImages } from "./PreviewTourImages"

type PreviewTourProps = Pick<DetailTour, "photos" | "photo_alt" | "title" | "meta_desc" | "currency_prefix" | "min_price" | "average_rating"> 

export const PreviewTour: FC<PreviewTourProps> = (props) => {
	return (
		<section className='flex flex-col gap-5 bg-background-400 pb-4'>
			<PreviewTourImages
				photos={props.photos}
				alt={props.photo_alt}
			/>
			<Container>
				<div className='container flex flex-col gap-5'>
					<Typography
						variant='h2'
						textWidth='semibold'
						as='h1'
					>
						{props.title}
					</Typography>

					<div className='flex flex-col gap-2'>
						<Typography
							variant='content2'
							className='text-primary-400'
						>
							{props.meta_desc}
						</Typography>
						<Rating rating={props.average_rating} />
						<Typography
							variant='h4'
							textWidth='medium'
							as='p'
						>
							{props.currency_prefix} {props.min_price}
						</Typography>
						<Typography
							variant='span'
							textWidth='medium'
							className='text-success'
						>
							Смотрите ниже что включено Центру
						</Typography>
					</div>
				</div>
			</Container>
		</section>
	)
}
