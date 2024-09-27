"use client"

import type { Order } from "@share/schemas"
import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import type { FC } from "react"
import { ListItem } from "./ListItem"

export const OrderPrice: FC<Order> & { Skeleton: typeof OrderPriceSkeleton } = ({
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
				{t("pages.SupplierDetailOrder.sections.infoPriceAndCounts")}
			</Typography>
			<ul className='mt-sm flex flex-col gap-sm'>
				<ListItem title={t("pages.SupplierDetailOrder.fields.transfer")}>
					<Typography>{transfer === 0 ? t("share.free") : transfer}</Typography>
				</ListItem>
				<ListItem title={t("pages.SupplierDetailOrder.fields.totalPrice")}>
					<Typography className='text-primary-50'>{total_price}</Typography>
				</ListItem>
				<ListItem title={t("pages.SupplierDetailOrder.fields.deposit")}>
					<Typography className='text-primary-50'>{deposit}</Typography>
				</ListItem>
				<ListItem title={t("pages.SupplierDetailOrder.fields.cashOnTour")}>
					<Typography className='text-primary-50'>{cash_on_tour}</Typography>
				</ListItem>
			</ul>
		</section>
	)
}

const OrderPriceSkeleton = () => (
	<div>
		<Skeleton className='h-6 w-1/3' />
		<ul className='mt-sm flex flex-col gap-2'>
			{new Array(3).fill(0).map((_, index) => (
				<ListItem.Skeleton key={index}>
					<Skeleton className='h-6 w-3/4' />
				</ListItem.Skeleton>
			))}
		</ul>
	</div>
)
OrderPrice.Skeleton = OrderPriceSkeleton
