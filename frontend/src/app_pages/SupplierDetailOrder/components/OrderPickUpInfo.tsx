import type { Order } from "@entity/order"
import { useGetUserInfoById } from "@entity/user"
import { Icon } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"
import Link from "next/link"
import type { FC } from "react"
import { ListItem } from "./ListItem"

interface OrderPickUpInfoProps {
	hotel: Order["hotel"]
	address: string
	room: Order["room_number"]
}

export const OrderPickUpInfo: FC<OrderPickUpInfoProps> = ({ address, hotel, room }) => {
	return (
		<section>
			<Typography
				variant='h6'
				as='h2'
			>
				Адрес туриста
			</Typography>
			<ul className='mt-sm flex flex-col gap-sm'>
				<ListItem title='Отель'>
					<Typography>{hotel}</Typography>
				</ListItem>
				<ListItem title='Адрес'>
					<Typography>{address}</Typography>
				</ListItem>
				<ListItem title='Номер комнаты'>
					<Typography>{room || "Не указан"}</Typography>
				</ListItem>
			</ul>
		</section>
	)
}
