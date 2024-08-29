import type { Order } from "@entity/order"
import { Icon } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"
import Link from "next/link"
import type { FC } from "react"

interface OrderHeaderProps {
	manager: Order["manager"]
	managerPhone: Order["manager_phone"]
	managerEmail: Order["manager_email"]
}

export const OrderHeader: FC<OrderHeaderProps> = ({ manager, managerEmail, managerPhone }) => {
	return (
		<section>
			<Icon
				name='Logo'
				className='h-14 w-36'
			/>
			<ul className='mt-sm flex flex-col gap-sm'>
				<li className='grid grid-cols-[20%,1fr] gap-sm'>
					<Typography>Address:</Typography>
					<address>1100 Welcome street, Manhattan, 112003, New York, NY</address>
				</li>
				<li className='grid grid-cols-[20%,1fr] gap-sm'>
					<Typography>Manager:</Typography>
					<Typography>{manager}</Typography>
				</li>
				<li className='grid grid-cols-[20%,1fr] gap-sm'>
					<Typography>Phone:</Typography>
					<Typography asChild>
						<Link href={`tel:${managerPhone}`}>{managerPhone}</Link>
					</Typography>
				</li>
				<li className='grid grid-cols-[20%,1fr] gap-sm'>
					<Typography>Email:</Typography>
					<Typography asChild>
						<Link href={`mailto:${managerEmail}`}>{managerEmail}</Link>
					</Typography>
				</li>
			</ul>
		</section>
	)
}
