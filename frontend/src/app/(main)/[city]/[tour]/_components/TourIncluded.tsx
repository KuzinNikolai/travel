import type { DetailTour } from "@entity/tour"
import { Icon } from "@share/ui/Icon"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

type TourIncludedProps = Pick<DetailTour, "included" | "notincluded">

export const TourIncluded: FC<TourIncludedProps> = ({ included, notincluded }) => {
	return (
		<Section title='Что включено'>
			<ul className='flex flex-col gap-1'>
				{included.map((include) => (
					<li
						key={`include-${include.id}`}
						className='flex gap-1'
					>
						<Icon
							name='Check'
							className='stroke-success'
						/>
						<Typography variant='span'>{include.name}</Typography>
					</li>
				))}
				{notincluded.map((notInclude) => (
					<li
						key={`notInclude-${notInclude.id}`}
						className='flex gap-1'
					>
						<Icon
							name='X'
							className='stroke-danger'
						/>
						<Typography variant='span'>{notInclude.name}</Typography>
					</li>
				))}
			</ul>
		</Section>
	)
}
