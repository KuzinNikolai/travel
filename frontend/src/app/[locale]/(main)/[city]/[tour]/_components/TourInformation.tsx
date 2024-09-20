import type { DetailTour } from "@entity/tour"
import { Icon } from "@share/ui/Icon"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { getTranslations } from "next-intl/server"
import type { FC } from "react"

type TourInformation = Pick<
	DetailTour,
	"duration" | "type" | "cat" | "pregnant_possible" | "child_price" | "what_age_child_free"
>

export const TourInformation: FC<TourInformation> = async ({ ...tour }) => {
	const t = await getTranslations()

	return (
		<Section title={t("pages.detailTour.information.title")}>
			<ul className='flex flex-col gap-2'>
				<li className='flex items-center gap-1'>
					<Icon
						name='Clock'
						className='h-6 w-6 stroke-1'
					/>
					<Typography variant='contentPrimary'>{tour.duration}</Typography>
				</li>
				<li className='flex items-center gap-1'>
					<Icon
						name='User'
						className='h-6 w-6 stroke-1'
					/>
					<Typography variant='contentPrimary'>{tour.type}</Typography>
				</li>
				<li className='flex items-center gap-1'>
					<Icon
						name='TrainFront'
						className='h-6 w-6 stroke-1'
					/>
					<Typography variant='contentPrimary'>{tour.cat}</Typography>
				</li>
				<li className='flex items-center gap-1'>
					<Icon
						name='Baby'
						className='h-6 w-6 stroke-1'
					/>
					{tour.what_age_child_free && tour.child_price ? (
						<Typography
							variant='contentPrimary'
							className='text-success'
						>
							{t("pages.detailTour.information.children.can", { maxAge: tour.what_age_child_free })}
						</Typography>
					) : (
						<Typography
							variant='contentPrimary'
							className='text-danger'
						>
							{t("pages.detailTour.information.children.cant")}
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
							variant='contentPrimary'
							className='text-success'
						>
							{t("pages.detailTour.information.pregnantPossible.can")}
						</Typography>
					) : (
						<Typography
							variant='contentPrimary'
							className='text-danger'
						>
							{t("pages.detailTour.information.pregnantPossible.cant")}
						</Typography>
					)}
				</li>
			</ul>
		</Section>
	)
}
