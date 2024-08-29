"use client"

import type { Order } from "@entity/order"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import type { FC } from "react"
import { ListItem } from "./ListItem"

export const OrderPrice: FC<Order> = ({
	cash_on_tour,
	total_price,
	transfer,
	deposit,
	quantity_adults,
	quantity_children,
	quantity_infant,
}) => {
	const t = useTranslations()

	return (
		<section>
			<Typography
				variant='h6'
				as='h2'
			>
				Count & price info
			</Typography>
			<ul className='mt-sm flex flex-col gap-sm'>
				<ListItem title={t('pages.SupplierDetailOrder.fields.transfer')}>
					<Typography>{transfer === 0 ? t('share.free') : transfer}</Typography>
				</ListItem>
				<ListItem title={t('pages.SupplierDetailOrder.fields.totalPrice')}>
					<Typography className="text-primary-50">{total_price}</Typography>
				</ListItem>
				<ListItem title={t('pages.SupplierDetailOrder.fields.deposit')}>
					<Typography className="text-primary-50">{deposit}</Typography>
				</ListItem>
				<ListItem title={t('pages.SupplierDetailOrder.fields.cashOnTour')}>
					<Typography className="text-primary-50">{cash_on_tour}</Typography>
				</ListItem>
			</ul>
		</section>
	)
}
