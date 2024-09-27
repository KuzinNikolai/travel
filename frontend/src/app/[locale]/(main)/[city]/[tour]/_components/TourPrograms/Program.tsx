"use client"

import { inter } from "@assets/fonts"
import { useUser } from "@entity/user"
import { useCreateOrderStore } from "@feature/order/createOrder"
import { ProgramTypeEnum, type DetailTour, type shareSchemas } from "@share/schemas"
import { Button } from "@share/ui/Buttons"
import { Icon } from "@share/ui/Icon"
import { Drawer, DrawerFooter } from "@share/ui/Modals"
import { Typography } from "@share/ui/Text"
import { useAuthStore } from "@widget/Auth"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import type { FC } from "react"
import { TourPrice } from "./ProgramPrice"

interface ProgramProps {
	tourId: DetailTour["id"]
	program: shareSchemas.Program
	currency: string
}

export const TourProgram: FC<ProgramProps> = ({ program, tourId, currency }) => {
	const t = useTranslations("components.tourProgram")

	const {
		query: { data: user },
	} = useUser()

	const pathname = usePathname()
	const authModal = useAuthStore()
	const router = useRouter()
	const { setProgram, setTour } = useCreateOrderStore()

	const onMoveOrder = () => {
		if (!user) {
			authModal.setExpand(true)
			return
		}

		setTour(tourId)
		setProgram(program.id)
		router.push(`${pathname}/order`)
	}

	const isIndividual =
		program.type === ProgramTypeEnum.individual || (program.individual_price !== null && program.individual_price > 0)

	return (
		<li className='flex flex-col gap-md rounded-md bg-base-160 p-md'>
			<div className='flex items-center justify-between gap-sm'>
				<div className='flex items-center gap-1'>
					<Icon
						name={isIndividual ? "User" : "Users"}
						className='h-6 w-6'
					/>
					<Typography>{(isIndividual ? t("type.individual") : t("type.group")).toUpperCase()}</Typography>
				</div>
				<div className='flex items-center gap-1'>
					<Icon
						name='Clock'
						className='h-6 w-6'
					/>
					{/* FIX: need to fix duration format */}
					{/* <Typography>{duration}</Typography> */}
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
					<TourPrice
						currency={currency}
						title={t("type.individual")}
						price={program.individual_price || 0}
					/>
				) : (
					<>
						<TourPrice
							currency={currency}
							title={t("price.adult")}
							price={program.adult_price || 0}
						/>
						{(program.child_price || 0) > 0 && (
							<TourPrice
								currency={currency}
								title={t("price.child")}
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
					{t("actions.order")}
				</Button>
				<Drawer
					title={program.title}
					trigger={
						<Button
							type='button'
							variant='outline'
							className='flex-1'
						>
							{t("actions.moreDetail")}
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
							<TourPrice
								currency={currency}
								title={t("type.individual")}
								price={program.individual_price || 0}
							/>
						) : (
							<>
								<TourPrice
									currency={currency}
									title={t("price.adult")}
									price={program.adult_price || 0}
								/>
								{program.child_price && (
									<TourPrice
										currency={currency}
										title={t("price.child")}
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
							{t("actions.order")}
						</Button>
					</DrawerFooter>
				</Drawer>
			</div>
		</li>
	)
}
