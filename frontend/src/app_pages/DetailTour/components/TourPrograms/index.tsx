import type { DetailTour } from "@entity/tour"
import { Section } from "@share/ui/Layout"
import type { FC } from "react"
import { TourProgram } from "./Program"

type TourProgramsProps = Pick<DetailTour, "programs" | "currency_prefix" | "slug">

export const ToutPrograms: FC<TourProgramsProps> = ({ programs, currency_prefix, slug }) => {
	return (
		<Section title='Программы и цены'>
			<ul className='flex flex-col gap-sm'>
				{programs.map((program) => (
					<TourProgram
						key={program.id + program.title}
						tourSlug={slug}
						currency={currency_prefix}
						program={program}
					/>
				))}
			</ul>
		</Section>
	)
}
