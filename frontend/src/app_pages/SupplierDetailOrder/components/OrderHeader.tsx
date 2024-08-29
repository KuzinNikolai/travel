"use client"

import type { Order } from "@entity/order"
import { Icon } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import Link from "next/link"
import type { FC } from "react"

interface OrderHeaderProps {
	manager: Order["manager"]
	managerPhone: Order["manager_phone"]
	managerEmail: Order["manager_email"]
}

export const OrderHeader: FC<OrderHeaderProps> = ({ manager, managerEmail, managerPhone }) => {
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
