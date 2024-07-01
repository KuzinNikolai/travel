import { Typography } from "@/components/Typography"
import { Container } from "@/components/layout/Container"
import { Rating } from "@/components/share/Rating"
import type { IDetailTour } from "@/packages/schemes/travel/tour.schema"
import type { FC } from "react"
import { PreviewTourImages } from "./PreviewTourImages"

interface IPreviewTourProps {
	tour: IDetailTour
}

export const PreviewTour: FC<IPreviewTourProps> = ({ tour }) => {
	return (
		<section className='flex flex-col gap-5 bg-background-400 pb-4'>
			<PreviewTourImages
				photos={tour.photos}
				alt={tour.photo_alt}
			/>
			<Container>
				<div className='container flex flex-col gap-5'>
					<Typography
						variant='h2'
						textWidth='semibold'
						as='h1'
					>
						{tour.title}
					</Typography>

					<div className='flex flex-col gap-2'>
						<Typography
							variant='content2'
							className='text-primary-400'
						>
							{tour.meta_desc}
						</Typography>
						<Rating rating={tour.average_rating} />
						<Typography
							variant='h4'
							textWidth='medium'
							as='p'
						>
							{tour.currency_prefix} {tour.min_price}
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
