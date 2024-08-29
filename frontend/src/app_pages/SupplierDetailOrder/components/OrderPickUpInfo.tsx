"use client"

import type { Order } from "@entity/order"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import type { FC } from "react"
import { ListItem } from "./ListItem"

interface OrderPickUpInfoProps {
	hotel: Order["hotel"]
	address: string
	room: Order["room_number"]
}

export const OrderPickUpInfo: FC<OrderPickUpInfoProps> = ({ address, hotel, room }) => {
	const t = useTranslations()

	return (
		<section>
			<Typography
				variant='h6'
				as='h2'
			>
				{t("pages.SupplierDetailOrder.sections.pickUpInfo")}
			</Typography>
			<ul className='mt-sm flex flex-col gap-sm'>
				<ListItem title={t("pages.SupplierDetailOrder.fields.hotel")}>
					<Typography>{hotel}</Typography>
				</ListItem>
				<ListItem title={t("pages.SupplierDetailOrder.fields.address")}>
					<Typography>{address}</Typography>
				</ListItem>
				<ListItem title={t("pages.SupplierDetailOrder.fields.roomNumber")}>
					<Typography>{room || t("share.notSpecified")}</Typography>
				</ListItem>
			</ul>
		</section>
	)
}
