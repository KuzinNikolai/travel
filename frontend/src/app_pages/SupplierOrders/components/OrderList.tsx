"use client"

import { SupplierOrderItem } from "@entity/order"
import { useGetAllOrders } from "@entity/order/model/lib/hooks/useGetAllOrders"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"

export const OrderList = () => {
	const t = useTranslations()

	const orders = useGetAllOrders()

	return (
		<ul className='flex flex-col gap-sm'>
			{orders.isPending && <div>skeleton</div>}
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
			{orders.isSuccess && orders.data?.length === 0 && <Typography>{t('pages.supplierOrderList.errors.ordersEmpty')}</Typography>}
		</ul>
	)
}
