import type { Order } from "@entity/order"
import { useGetUserInfoById } from "@entity/user"
import { Typography } from "@share/ui/Text"
import Link from "next/link"
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
	return (
		<section>
			<Typography
				variant='h6'
				as='h2'
			>
				Count & price info
			</Typography>
			<ul className='mt-sm flex flex-col gap-sm'>
				<ListItem title='Передача'>
					<Typography>{transfer === 0 ? "Бесплатно" : transfer}</Typography>
				</ListItem>
				<ListItem title='Общая сумма'>
					<Typography className="text-primary-50">{total_price}</Typography>
				</ListItem>
				<ListItem title='Депозит'>
					<Typography className="text-primary-50">{deposit}</Typography>
				</ListItem>
				<ListItem title='Наличные на тур'>
					<Typography className="text-primary-50">{cash_on_tour}</Typography>
				</ListItem>
			</ul>
		</section>
	)
}
