"use client"

import type { DetailTour, Program } from "@entity/tour"
import { useUserTokenStore } from "@entity/user"
import { useOrderStore } from "@feature/createOrder"
import { cn } from "@share/lib"
import { Button } from "@share/ui/Buttons"
import { Drawer } from "@share/ui/Modals"
import { Typography } from "@share/ui/Text"
import { useAuthStore } from "@widget/Auth"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, type FC } from "react"

interface ProgramProps {
	tour: DetailTour
	program: Program
	currency: string
}

export const TourProgram: FC<ProgramProps> = ({ program, tour, currency }) => {
	const pathname = usePathname()
	const router = useRouter()
	const { setProgramTour } = useOrderStore()
	const { getToken } = useUserTokenStore()
	const authModal = useAuthStore()
	const [isAuthorized, setAuthorized] = useState(false)

	useEffect(() => {
		setAuthorized(!!getToken())
	}, [getToken])

	const onMoveOrder = () => {
		setProgramTour({ tour, program })
		router.push(`${pathname}/order`)
	}

	return (
		<div className='flex flex-col gap-3 border-l-2 border-l-gray-500/60 bg-background p-3 py-4'>
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
			<div className='flex flex-wrap gap-1'>
				{isAuthorized ? (
					<Button
						variant='default'
						onClick={onMoveOrder}
					>
						Заказать
					</Button>
				) : (
					<Button
						variant='secondary'
						className='w-full'
						onClick={() => authModal.setExpand(true)}
					>
						Авторизуйтесь чтобы заказать
					</Button>
				)}
				<Drawer
					title={program.title}
					trigger={
						<Button
							variant='secondary'
							className={cn(!isAuthorized && "w-full")}
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
		</div>
	)
}
