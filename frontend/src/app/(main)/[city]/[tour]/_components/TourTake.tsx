import type { DetailTour } from "@entity/tour"
import { Icon, Section, Typography } from "@share/ui"
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
