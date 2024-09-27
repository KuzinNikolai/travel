import { getOrderById } from "@entity/order"
import { defender } from "@share/packages/auth"
import type { PagesProps } from "@share/types"
import { Header } from "@share/ui/Headers"
import { Section } from "@share/ui/Layout"
import { List } from "@share/ui/List"
import { getTranslations } from "next-intl/server"
import { notFound, redirect } from "next/navigation"
import { OrderHeader } from "./_components/OrderHeader"
import { OrderPickUpInfo } from "./_components/OrderPickUpInfo"
import { OrderPrice } from "./_components/OrderPrice"
import { OrderTourInfo } from "./_components/OrderTourInfo"
import { OrderTouristsInfo } from "./_components/OrderTouristsInfo"

export const dynamic = "force-dynamic"

export default async function DetailOrder({ params }: PagesProps) {
	const { order: orderParam } = params

	const orderId = Number.parseInt(orderParam)

	if (Number.isNaN(orderId)) {
		redirect(".")
	}

	const t = await getTranslations()

	const { token, tourist } = {
		token: defender.getToken(),
		tourist: await defender.getUser(),
	}

	if (!token || !tourist) {
		notFound()
	}

	const order = await getOrderById(orderId)

	if (!order) {
		notFound()
	}

	return (
		<>
			<Header title={t("pages.SupplierDetailOrder.title", { order: orderId })} />
			<Section className='h-full flex-1'>
				<List
					orientation='vertical'
					showDivider
				>
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
						<OrderTouristsInfo user={tourist} />
						<OrderPickUpInfo
							hotel={order.hotel || ""}
							address={""}
							room={order.room_number || null}
						/>
						<OrderPrice {...order} />
					</>
					)
				</List>
			</Section>
		</>
	)
}
