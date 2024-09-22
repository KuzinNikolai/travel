"use client"

import type { Order } from "@share/schemas"
import { Icon } from "@share/ui/Icon"
import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import Link from "next/link"
import type { FC } from "react"

interface OrderHeaderProps {
	manager: Order["manager"]
	managerPhone: Order["manager_phone"]
	managerEmail: Order["manager_email"]
}

export const OrderHeader: FC<OrderHeaderProps> & { Skeleton: typeof OrderHeaderSkeleton } = ({
	manager,
	managerEmail,
	managerPhone,
}) => {
	const t = useTranslations()

	return (
		<section>
			<Icon
				name='Logo'
				className='h-14 w-36'
			/>
			<ul className='mt-sm flex flex-col gap-sm'>
				<li className='grid grid-cols-[20%,1fr] gap-sm'>
					<Typography>{t("pages.SupplierDetailOrder.fields.address")}:</Typography>
					<address>1100 Welcome street, Manhattan, 112003, New York, NY</address>
				</li>
				<li className='grid grid-cols-[20%,1fr] gap-sm'>
					<Typography>{t("pages.SupplierDetailOrder.fields.manager")}:</Typography>
					<Typography>{manager}</Typography>
				</li>
				<li className='grid grid-cols-[20%,1fr] gap-sm'>
					<Typography>{t("pages.SupplierDetailOrder.fields.phone")}:</Typography>
					<Typography asChild>
						<Link href={`tel:${managerPhone}`}>{managerPhone}</Link>
					</Typography>
				</li>
				<li className='grid grid-cols-[20%,1fr] gap-sm'>
					<Typography>{t("pages.SupplierDetailOrder.fields.email")}:</Typography>
					<Typography asChild>
						<Link href={`mailto:${managerEmail}`}>{managerEmail}</Link>
					</Typography>
				</li>
			</ul>
		</section>
	)
}

const OrderHeaderSkeleton = () => (
	<div>
		<Skeleton className='h-10 w-36' />
		<div className='mt-sm flex flex-col gap-sm'>
			{new Array(4).fill(0).map((_, index) => (
				<div
					key={index}
					className='grid grid-cols-[20%,1fr] gap-sm'
				>
					<Skeleton className='h-6 w-full' />
					<Skeleton className='h-6 w-1/2' />
				</div>
			))}
		</div>
	</div>
)
OrderHeader.Skeleton = OrderHeaderSkeleton
