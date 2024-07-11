import { TourProgram, type DetailTour } from "@entity/tour"
import { Section } from "@share/ui/Layout"
import type { FC } from "react"

interface TourProgramsProps {
	tour: DetailTour
}

export const ToutPrograms: FC<TourProgramsProps> = ({ tour }) => {
	return (
		<Section title='Программы и цены'>
			<ul className='flex flex-col gap-1'>
				{tour.programs.map((program) => (
					<li key={program.id + program.title}>
						<TourProgram
							tour={tour}
							currency={tour.currency_prefix}
							program={program}
						/>
					</li>
				))}
			</ul>
		</Section>
	)
}
