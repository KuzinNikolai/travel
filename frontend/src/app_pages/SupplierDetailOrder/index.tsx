"use client"

import { useGetOrder } from "@entity/order"
import { useGetUserInfoById } from "@entity/user"
import type { PagesProps } from "@share/lib"
import { Header } from "@share/ui/Headers"
import { Section } from "@share/ui/Layout"
import { List } from "@share/ui/List"
import { redirect } from "next/navigation"
import type { FC } from "react"
import { OrderHeader } from "./components/OrderHeader"
import { OrderPickUpInfo } from "./components/OrderPickUpInfo"
import { OrderPrice } from "./components/OrderPrice"
import { OrderTourInfo } from "./components/OrderTourInfo"
import { OrderTouristsInfo } from "./components/OrderTouristsInfo"
import { useTranslations } from "next-intl"

type SurlierDetailOrderProps = PagesProps<{
	order: string
}>

export const SupplierDetailOrder: FC<SurlierDetailOrderProps> = ({ params }) => {
	const { order: orderNumber } = params

	const t = useTranslations()

	const { query, order } = useGetOrder(orderNumber)
	const tourist = useGetUserInfoById(order?.user || -1)

	if (query.isSuccess && !order) {
		redirect(".")
	}

	return (
		<>
			<Header title={t("pages.SupplierDetailOrder.title", { order: orderNumber })} />
			<Section className='h-full flex-1'>
				<List
					orientation='vertical'
					showDivider
				>
					{order && tourist.data ? (
						<>
							<OrderHeader
								manager={order.manager}
								managerEmail={order.manager_email}
								managerPhone={order.manager_phone}
							/>
							<OrderTourInfo
								country={order.tour_title}
								city={order.city_name}
								tour={order.tour_title}
								program={order.program_title}
								dateTrip={order.trip_date}
								pickUpTime={order.pickup_time}
							/>
							<OrderTouristsInfo user={tourist.data} />
							<OrderPickUpInfo
								hotel={order.hotel || ""}
								address={""}
								room={order.room_number || null}
							/>
							<OrderPrice {...order} />
						</>
					) : (
						<>
							<OrderHeader.Skeleton />
							<OrderTourInfo.Skeleton />
							<OrderTouristsInfo.Skeleton />
							<OrderPickUpInfo.Skeleton />
							<OrderPrice.Skeleton />
						</>
					)}
				</List>
			</Section>
		</>
	)
}
