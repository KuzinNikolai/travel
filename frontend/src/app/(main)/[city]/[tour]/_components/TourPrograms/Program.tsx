"use client"

import { inter } from "@assets/fonts"
import { type DetailTour, GroupType, type Program } from "@entity/tour"
import { useUser } from "@entity/user"
import { useOrderStore } from "@feature/order"
import { Button } from "@share/ui/Buttons"
import { Drawer, DrawerFooter } from "@share/ui/Modals"
import { Typography } from "@share/ui/Text"
import { useAuthStore } from "@widget/Auth"
import clsx from "clsx"
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
			variant='content1'
			as='h3'
			className='flex flex-nowrap gap-2 text-primary-400'
		>
			{title}:
			<Typography
				variant='span'
				className='text-primary'
			>
				{currency} {price}
			</Typography>
		</Typography>
	)
}

export const TourProgram: FC<IProgramProps> = ({ program, tourSlug, currency }) => {
	const { data: user } = useUser()
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
		router.push(`${pathname}/payment`)
	}

	const isIndividual = program.type === GroupType.individual

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
			<ul className='flex flex-col gap-0'>
				{isIndividual ? (
					<li>
						<Price
							currency={currency}
							title='Индивидуальный'
							price={program.individual_price || 0}
						/>
					</li>
				) : (
					<>
						<li>
							<Price
								currency={currency}
								title='Взрослый'
								price={program.adult_price || 0}
							/>
						</li>
						{program.child_price && (
							<li>
								{" "}
								<Price
									currency={currency}
									title='Ребенок'
									price={program.child_price}
								/>
							</li>
						)}
					</>
				)}
			</ul>
			<div className='flex gap-1'>
				<Button
					type='button'
					variant='default'
					className='flex-1 text-xl'
					onClick={onMoveOrder}
				>
					Заказать
				</Button>
				<Drawer
					title={program.title}
					trigger={
						<Button
							type='button'
							variant='secondary'
							className='flex-1 text-xl'
						>
							Подробнее
						</Button>
					}
				>
					<Typography
						variant='content1'
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
