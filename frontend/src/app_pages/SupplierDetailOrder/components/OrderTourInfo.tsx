import type { Order } from "@entity/order"
import { Typography } from "@share/ui/Text"
import { format } from "date-fns"
import type { FC } from "react"
import { ListItem } from "./ListItem"

interface OrderTourInfoProps {
	country: Order["country_name"]
	city: Order["city_name"]
	tour: Order["tour_title"]
	program: Order["program_title"]
	dateTrip: Order["trip_date"]
	pickUpTime: Order["pickup_time"]
}

export const OrderTourInfo: FC<OrderTourInfoProps> = ({ country, city, tour, program, dateTrip, pickUpTime }) => {
	return (
		<section className='flex flex-col gap-sm'>
			<Typography
				variant='h6'
				textWidth='bold'
				as='h2'
				className='sr-only absolute'
			>
				Order info
			</Typography>
			<ul className='flex flex-col gap-2'>
				<ListItem title='Country'>
					<Typography>{country}</Typography>
				</ListItem>
				<ListItem title='City'>
					<Typography>{city}</Typography>
				</ListItem>
				<ListItem title='Tour'>
					<Typography>{tour}</Typography>
				</ListItem>
				<ListItem title='Program'>
					<Typography>{program}</Typography>
				</ListItem>
				<ListItem title='Date trip'>
					<Typography asChild>
						<time
							className='block'
							dateTime={dateTrip ? format(dateTrip, "MM-dd-yyyy") : ""}
						>
							{dateTrip && format(dateTrip, "MM/dd/yyyy")}
						</time>
					</Typography>
				</ListItem>
				<ListItem title='Pick-up time'>
					<Typography asChild>
						{pickUpTime ? (
							<time
								className='block'
								dateTime={pickUpTime ? format(pickUpTime, "MM-dd-yyyy") : ""}
							>
								{pickUpTime && format(pickUpTime, "HH:MM")}
							</time>
						) : (
							<p>Не указан</p>
						)}
					</Typography>
				</ListItem>
			</ul>
		</section>
	)
}
