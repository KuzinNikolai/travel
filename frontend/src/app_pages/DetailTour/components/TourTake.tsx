import type { DetailTour } from "@entity/tour"
import { Icon } from "@share/ui/Icon"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

type TourTakeProps = Pick<DetailTour, "take">

export const TourTake: FC<TourTakeProps> = ({ take }) => {
	return (
		<Section title='Взять с собой'>
			<ul className='flex flex-col gap-1'>
				{take.map((take) => (
					<li
						key={take.id}
						className='flex items-center gap-1'
					>
						<Icon
							name='SquarePlus'
							className='h-6 w-6 stroke-1 stroke-gray-500'
						/>
						<Typography
							variant='contentPrimary'
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
