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
						trigger={<Button variant='outline'>Читать далее</Button>}
					>
						<Typography variant='contentPrimary' className="text-base-20 leading-5">{description}</Typography>
					</Drawer>
				) : null
			}
		>
			<Typography
				variant='contentPrimary'
				className='line-clamp-3 text-base-20 leading-5'
			>
				{description}
			</Typography>
		</Section>
	)
}
