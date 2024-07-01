import { Icon } from "@/components/Icon"
import { Typography } from "@/components/Typography"
import { Section } from "@/components/layout/Section"
import type { IDetailTour } from "@/packages/schemes/travel/tour.schema"
import type { FC } from "react"

interface ITourTakeProps {
	tour: IDetailTour
}

export const TourTake: FC<ITourTakeProps> = ({ tour }) => {
	return (
		<Section title='Взять с собой'>
			<ul className='flex flex-col gap-1'>
				{tour.take.map((take) => (
					<li
						key={take.id}
						className='flex items-center gap-1'
					>
						<Icon
							name='SquarePlus'
							className='h-6 w-6 stroke-1 stroke-gray-500'
						/>
						<Typography
							variant='span'
							key={take.id}
						>
							{take.name}
						</Typography>
					</li>
				))}
			</ul>
		</Section>
	)
}
