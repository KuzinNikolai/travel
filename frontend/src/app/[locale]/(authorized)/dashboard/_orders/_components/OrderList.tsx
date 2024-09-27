import { getAllOrders, SupplierOrderItem } from "@entity/order"
import { Typography } from "@share/ui/Text"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export const OrderList = async () => {
	const t = await getTranslations()

	const orders = (await getAllOrders()) || []

	return (
		<ul className='flex flex-col gap-sm'>
			{orders.map((order) => (
				<li
					key={order.id}
					className='relative'
				>
					<Link
						href={`/orders/${order.order_number}`}
						aria-label={`Перейти к заказу ${order.order_number}`}
						className='block'
					>
						<SupplierOrderItem
							order_number={order.order_number}
							tour_title={order.tour_title}
							trip_date={order.trip_date}
						/>
					</Link>
				</li>
			))}
			{orders.length === 0 && <Typography>{t("pages.supplierOrderList.errors.ordersEmpty")}</Typography>}
		</ul>
	)
}
