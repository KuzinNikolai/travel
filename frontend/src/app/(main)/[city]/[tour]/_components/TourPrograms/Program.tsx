"use client"

import { useOrderStore } from "@feature/order"
import type { DetailTour, Program } from "@entity/tour"
import { Button, Drawer, Typography } from "@share/ui"
import clsx from "clsx"
import { usePathname, useRouter } from "next/navigation"
import type { FC } from "react"

interface IProgramProps {
	tourSlug: DetailTour["slug"]
	program: Program
	currency: string
}

export const TourProgram: FC<IProgramProps> = ({ program, tourSlug, currency }) => {
	const pathname = usePathname()
	const router = useRouter()
	const { setProgram, setTour } = useOrderStore()

	const onMoveOrder = () => {
		setTour(tourSlug)
		setProgram(program.id)
		router.push(`${pathname}/payment`)
	}

	return (
		<li className={clsx("flex flex-col gap-3 p-3 py-4", "border-l-2 border-l-gray-500/60 bg-background")}>
			<Typography
				variant='h3'
				as='h3'
				className='text-xl'
				textWidth='medium'
			>
				{program.title}
			</Typography>
			<ul className='flex flex-col'>
				<li
					key='price-adult'
					className='flex gap-1'
				>
					<Typography variant='span'>
						Взрослый:{" "}
						<Typography variant='span'>
							{currency} {program.adult_price}
						</Typography>
					</Typography>
				</li>
				<li
					key='price-child'
					className='flex gap-1'
				>
					<Typography variant='span'>
						Ребенок:{" "}
						<Typography variant='span'>
							{currency} {program.child_price}
						</Typography>
					</Typography>
				</li>
			</ul>
			<div className='flex gap-1'>
				<Button
					className={clsx(
						"w-full flex-1 justify-center rounded text-center",
						"bg-accent text-white hover:bg-transparent hover:text-accent",
						"text-xl",
					)}
					onClick={onMoveOrder}
				>
					Заказать
				</Button>
				<Drawer
					title={program.title}
					trigger={
						<Button
							className={clsx(
								"w-full flex-1 justify-center rounded text-center",
								"border border-accent text-accent hover:bg-accent hover:text-accent hover:text-white",
								"text-xl",
							)}
						>
							Подробнее
						</Button>
					}
				>
					<Typography
						variant='content1'
						as='pre'
						className='max-w-full text-wrap'
					>
						{program.description}
					</Typography>
					<div className='mt-6 flex flex-col gap-1'>
						<Typography
							variant='content1'
							as='h3'
							className='flex flex-nowrap gap-2 text-primary-400'
						>
							Взрослый:
							<Typography
								variant='span'
								className='text-primary'
							>
								{currency} {program.adult_price}
							</Typography>
						</Typography>
						<Typography
							variant='content1'
							as='h3'
							className='flex flex-nowrap gap-2 text-primary-400'
						>
							Ребенок:
							<Typography
								variant='span'
								className='text-primary'
							>
								{currency} {program.child_price}
							</Typography>
						</Typography>
					</div>

					<Button
						className='mt-2 w-full justify-center bg-accent text-white'
						onClick={onMoveOrder}
					>
						заказать
					</Button>
				</Drawer>
			</div>
		</li>
	)
}
