import type { DetailTour } from "@entity/tour"
import { Button } from "@share/ui/Buttons"
import { Section } from "@share/ui/Layout"
import { Drawer } from "@share/ui/Modals"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

type TourDescriptionProps = Pick<DetailTour, "description">

export const TourDescription: FC<TourDescriptionProps> = ({ description }) => {
	return (
		<Section
			title='Описание'
			header={
				description.length > 13 ? (
					<Drawer
						title='Описание'
						trigger={
							<Button className='text-red-500 hover:text-red-600 '>
								<Typography
									variant='button'
									as='div'
									textWidth='medium'
								>
									Читать далее
								</Typography>
							</Button>
						}
					>
						<Typography variant='content2'>{description}</Typography>
					</Drawer>
				) : null
			}
		>
			<Typography
				variant='content2'
				className='line-clamp-3 text-primary-400'
			>
				{description}
			</Typography>
		</Section>
	)
}
