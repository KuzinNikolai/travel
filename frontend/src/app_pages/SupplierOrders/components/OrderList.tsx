"use client"

import { SupplierOrderItem } from "@entity/order"
import { useGetAllOrders } from "@entity/order/model/lib/hooks/useGetAllOrders"
import { Typography } from "@share/ui/Text"

export const OrderList = () => {
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
			{orders.isSuccess && orders.data?.length === 0 && <Typography>Никто еще не сделал заказа</Typography>}
		</ul>
	)
}
