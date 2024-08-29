"use client"

import { SupplierOrderItem } from "@entity/order"
import { useGetAllOrders } from "@entity/order/model/lib/hooks/useGetAllOrders"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"

export const OrderList = () => {
	const t = useTranslations()

	const orders = useGetAllOrders()

	console.log(orders.isPending)

	return (
		<ul className='flex flex-col gap-sm'>
			{orders.isPending && <OrderListSkeleton />}
			{orders.data &&
				orders.data?.length > 0 &&
				orders.data.map((order) => (
					<li key={order.id}>
						<SupplierOrderItem
							order_number={order.order_number}
							tour_title={order.tour_title}
							trip_date={order.trip_date}
						/>
					</li>
				))}
			{orders.isSuccess && orders.data?.length === 0 && (
				<Typography>{t("pages.supplierOrderList.errors.ordersEmpty")}</Typography>
			)}
		</ul>
	)
}

function OrderListSkeleton() {
	return (
		<div className='flex flex-col gap-sm'>
			{new Array(5).fill(0).map((_, index) => (
				<SupplierOrderItem.Skeleton key={index} />
			))}
		</div>
	)
}
