import type { User } from "@entity/user"
import { Typography } from "@share/ui/Text"
import Link from "next/link"
import type { FC } from "react"
import { ListItem } from "./ListItem"

interface OrderTouristsInfoProps {
	user: User | null
}

export const OrderTouristsInfo: FC<OrderTouristsInfoProps> = ({ user }) => {
	if (user === null) {
		return <Typography variant='h7'>Произошла ошибка и турист не был найден</Typography>
	}

	return (
		<section>
			<Typography
				variant='h6'
				as='h2'
			>
				Tourists info
			</Typography>
			<ul className='mt-sm flex flex-col gap-2'>
				<ListItem title='Имя'>
					{user.first_name || user.last_name ? (
						<Typography>{`${user?.first_name} ${user.last_name}`}</Typography>
					) : (
						<Typography>{user.username}</Typography>
					)}
				</ListItem>
				<ListItem title='Почта'>
					<Typography asChild>
						<Link href={`mailto:${user.email}`}>{user.email}</Link>
					</Typography>
				</ListItem>
				<ListItem title='Номер телефона'>
					<Typography asChild>
						{user.phone ? (
							<Link href={`tel:${user.phone}`}>{user.phone}</Link>
						) : (
							<Typography>Телефон не указан</Typography>
						)}
					</Typography>
				</ListItem>
			</ul>
		</section>
	)
}
