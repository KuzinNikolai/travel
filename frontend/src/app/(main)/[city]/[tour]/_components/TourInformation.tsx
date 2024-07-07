import type { DetailTour } from "@entity/tour"
import { Icon } from "@share/ui/Icon"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

type TourInformation = Pick<
	DetailTour,
	"duration" | "type" | "cat" | "pregnant_possible" | "child_price" | "what_age_child_free"
>

export const TourInformation: FC<TourInformation> = ({ ...tour }) => {
	return (
		<Section title='О экскурсии'>
			<ul className='flex flex-col gap-2'>
				<li className='flex items-center gap-1'>
					<Icon
						name='Clock'
						className='h-6 w-6 stroke-1'
					/>
					<Typography variant='span'>{tour.duration}</Typography>
				</li>
				<li className='flex items-center gap-1'>
					<Icon
						name='User'
						className='h-6 w-6 stroke-1'
					/>
					<Typography variant='span'>{tour.type}</Typography>
				</li>
				<li className='flex items-center gap-1'>
					<Icon
						name='TrainFront'
						className='h-6 w-6 stroke-1'
					/>
					<Typography variant='span'>{tour.cat}</Typography>
				</li>
				<li className='flex items-center gap-1'>
					<Icon
						name='Baby'
						className='h-6 w-6 stroke-1'
					/>
					{tour.what_age_child_free && tour.child_price ? (
						<Typography
							variant='span'
							className='text-success'
						>
							С детьми можно. (Дети до {tour.what_age_child_free} лет бесплатно)
						</Typography>
					) : (
						<Typography
							variant='span'
							className='text-danger'
						>
							С детьми нельзя
						</Typography>
					)}
				</li>

				<li className='flex items-center gap-1'>
					<Icon
						name='Baby'
						className='h-6 w-6 stroke-1'
					/>
					{tour.pregnant_possible ? (
						<Typography
							variant='span'
							className='text-success'
						>
							Беременным можно
						</Typography>
					) : (
						<Typography
							variant='span'
							className='text-danger'
						>
							Беременным нельзя
						</Typography>
					)}
				</li>
			</ul>
		</Section>
	)
}
