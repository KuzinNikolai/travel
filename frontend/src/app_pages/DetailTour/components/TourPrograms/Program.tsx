"use client"

import { inter } from "@assets/fonts"
import { type DetailTour, GroupType, type Program } from "@entity/tour"
import { useUser } from "@entity/user"
import { useOrderStore } from "@feature/order"
import { Button } from "@share/ui/Buttons"
import { Icon } from "@share/ui/Icon"
import { Drawer, DrawerFooter } from "@share/ui/Modals"
import { Typography } from "@share/ui/Text"
import { useAuthStore } from "@widget/Auth"
import { usePathname, useRouter } from "next/navigation"
import type { FC } from "react"

interface IProgramProps {
	tourSlug: DetailTour["slug"]
	program: Program
	currency: string
}

interface PriceProps {
	title: string
	currency: string
	price: number
}

const Price: FC<PriceProps> = ({ title, currency, price }) => {
	return (
		<Typography
			variant='contentPrimary'
			as='h3'
			className='flex flex-nowrap gap-2 text-primary-400'
		>
			{title}:
			<Typography
				variant='contentPrimary'
				className='text-primary'
			>
				{currency} {price}
			</Typography>
		</Typography>
	)
}

export const TourProgram: FC<IProgramProps> = ({ program, tourSlug, currency }) => {
	const {
		query: { data: user },
	} = useUser()

	const pathname = usePathname()
	const authModal = useAuthStore()
	const router = useRouter()
	const { setProgram, setTour } = useOrderStore()

	const onMoveOrder = () => {
		if (!user) {
			authModal.setExpand(true)
			return
		}

		setTour(tourSlug)
		setProgram(program.id)
		router.push(`${pathname}/order`)
	}

	const isIndividual =
		program.type === GroupType.individual || (program.individual_price !== null && program.individual_price > 0)

	return (
		<li className='flex flex-col gap-md rounded-md bg-base-160 p-md'>
			<div className='flex items-center justify-between gap-sm'>
				<div className='flex items-center gap-1'>
					<Icon
						name={isIndividual ? "User" : "Users"}
						className='h-6 w-6'
					/>
					<Typography>{isIndividual ? "ИНДИВИДУАЛЬНО" : "ГРУППОВАЯ СБОРНАЯ"}</Typography>
				</div>
				<div className='flex items-center gap-1'>
					<Icon
						name='Clock'
						className='h-6 w-6'
					/>
					<Typography>{program.duration}</Typography>
				</div>
			</div>
			<Typography
				variant='h5'
				as='h3'
				textWidth='medium'
				className='text-base-20'
			>
				{program.title}
			</Typography>
			<div className='flex flex-col gap-1'>
				{isIndividual ? (
					<Price
						currency={currency}
						title='Индивидуальный'
						price={program.individual_price || 0}
					/>
				) : (
					<>
						<Price
							currency={currency}
							title='Взрослый'
							price={program.adult_price || 0}
						/>
						{(program.child_price || 0) > 0 && (
							<Price
								currency={currency}
								title='Ребенок'
								price={program.child_price || 0}
							/>
						)}
					</>
				)}
			</div>
			<div className='flex gap-sm'>
				<Button
					type='button'
					variant='primary'
					className='flex-1'
					onClick={onMoveOrder}
				>
					Заказать
				</Button>
				<Drawer
					title={program.title}
					trigger={
						<Button
							type='button'
							variant='outline'
							className='flex-1'
						>
							Подробнее
						</Button>
					}
				>
					<Typography
						variant='contentPrimary'
						as='pre'
						className={`max-w-full text-wrap leading-5 ${inter.className}`}
					>
						{program.description}
					</Typography>
					<div className='mt-6 flex flex-col gap-1'>
						{isIndividual ? (
							<Price
								currency={currency}
								title='Индивидуальный'
								price={program.individual_price || 0}
							/>
						) : (
							<>
								<Price
									currency={currency}
									title='Взрослый'
									price={program.adult_price || 0}
								/>
								{program.child_price && (
									<Price
										currency={currency}
										title='Ребенок'
										price={program.child_price}
									/>
								)}
							</>
						)}
					</div>

					<DrawerFooter>
						<Button
							className='w-full'
							onClick={onMoveOrder}
						>
							заказать
						</Button>
					</DrawerFooter>
				</Drawer>
			</div>
		</li>
	)
}
