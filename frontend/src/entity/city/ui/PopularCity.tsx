import { Typography } from "@share/ui"
import Image from "next/image"
import Link from "next/link"
import type { FC } from "react"
import type { z } from "zod"
import type { cityItemSchema } from "../consts/schema"

type PopularCityProps = z.infer<typeof cityItemSchema>

export const PopularCity: FC<PopularCityProps> = (props) => {
	return (
		<li className='relative h-[140px] w-full overflow-hidden rounded-lg bg-background-400'>
			<div className='absolute top-0 left-0 h-full w-full'>
				<Image
					src={props.photo}
					alt=''
					width={300}
					height={300}
					className='w-full object-cover object-center'
				/>
				{/* <div className="absolute left-0 top-0 w-full h-full bg-primary opacity-20"></div> */}
			</div>
			<div className='absolute right-0 bottom-0 left-0 flex flex-col gap-[4px] p-3'>
				<Typography
					variant='content2'
					textTransform='uppercase'
					textWidth='semibold'
					className='text-primary-100'
				>
					{props.name}
				</Typography>
				<Typography
					variant='content2'
					textTransform='uppercase'
					className='text-primary-100'
				>
					экскурсий: {props.tour_count || 0}
				</Typography>
			</div>
			<Link
				href={`/${props.slug}`}
				className='absolute top-0 right-0 bottom-0 left-0'
				aria-label={`Ссылка на страницу ${props.name} города`}
			/>
		</li>
	)
}
