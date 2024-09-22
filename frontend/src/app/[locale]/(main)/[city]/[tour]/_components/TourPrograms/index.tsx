import type { DetailTour } from "@share/schemas"
import { Section } from "@share/ui/Layout"
import type { FC } from "react"
import { TourProgram } from "./Program"

type TourProgramsProps = Pick<DetailTour, "programs" | "currency_prefix" | "id">

export const ToutPrograms: FC<TourProgramsProps> = ({ programs, currency_prefix, id }) => {
	return (
		<Section title='Программы и цены'>
			<ul className='flex flex-col gap-sm'>
				{programs.map((program) => (
					<TourProgram
						key={program.id + program.title}
						tourId={id}
						currency={currency_prefix}
						program={program}
					/>
				))}
			</ul>
		</Section>
	)
}
