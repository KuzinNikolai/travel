"use client"

import type { Order } from "@entity/order"
import { Typography } from "@share/ui/Text"
import { format } from "date-fns"
import type { FC } from "react"
import { ListItem } from "./ListItem"
import { useTranslations } from "next-intl"
import { Skeleton } from "@share/ui/Skeleton"

interface OrderTourInfoProps {
	country: Order["country_name"]
	city: Order["city_name"]
	tour: Order["tour_title"]
	program: Order["program_title"]
	dateTrip: Order["trip_date"]
	pickUpTime: Order["pickup_time"]
}

export const OrderTourInfo: FC<OrderTourInfoProps> & { Skeleton: typeof OrderTourInfoSkeleton } = ({
	country,
	city,
	tour,
	program,
	dateTrip,
	pickUpTime,
}) => {
	const t = useTranslations()

	return (
		<section className='flex flex-col gap-sm'>
			<Typography
				variant='h6'
				textWidth='bold'
				as='h2'
				className='sr-only absolute'
			>
				Order info
			</Typography>
			<ul className='flex flex-col gap-2'>
				<ListItem title={t("share.entities.country")}>
					<Typography>{country}</Typography>
				</ListItem>
				<ListItem title={t("share.entities.city")}>
					<Typography>{city}</Typography>
				</ListItem>
				<ListItem title={t("share.entities.tour")}>
					<Typography>{tour}</Typography>
				</ListItem>
				<ListItem title={t("pages.SupplierDetailOrder.fields.program")}>
					<Typography>{program}</Typography>
				</ListItem>
				<ListItem title={t("pages.SupplierDetailOrder.fields.tourDate")}>
					<Typography
						className='text-primary-50'
						asChild
					>
						<time
							className='block'
							dateTime={dateTrip ? format(dateTrip, "MM-dd-yyyy") : ""}
						>
							{dateTrip && format(dateTrip, "MM/dd/yyyy")}
						</time>
					</Typography>
				</ListItem>
				<ListItem title={t("pages.SupplierDetailOrder.fields.pickUpTime")}>
					<Typography
						className='text-primary-50'
						asChild
					>
						{pickUpTime ? (
							<time
								className='block'
								dateTime={pickUpTime ? format(pickUpTime, "MM-dd-yyyy") : ""}
							>
								{pickUpTime && format(pickUpTime, "HH:MM")}
							</time>
						) : (
							<p>{t("share.notSpecified")}</p>
						)}
					</Typography>
				</ListItem>
			</ul>
		</section>
	)
}

const OrderTourInfoSkeleton = () => (
	<div className='flex flex-col gap-sm'>
		<Typography
			variant='h6'
			textWidth='bold'
			as='h2'
			className='sr-only absolute'
		>
			Order info
		</Typography>
		<ul className='flex flex-col gap-2'>
			{new Array(4).fill(0).map((_, index) => (
				<ListItem.Skeleton key={index}>
					<Skeleton className='h-6 w-3/4' />
				</ListItem.Skeleton>
			))}
			<ListItem.Skeleton>
				<Skeleton className='h-6 w-2/3 from-primary-50/20 to-primary-40/20' />
			</ListItem.Skeleton>
			<ListItem.Skeleton>
				<Skeleton className='h-6 w-2/6 from-primary-50/20 to-primary-40/20' />
			</ListItem.Skeleton>
		</ul>
	</div>
)
OrderTourInfo.Skeleton = OrderTourInfoSkeleton
