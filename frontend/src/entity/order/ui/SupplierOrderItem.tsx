import type { Order } from "@share/schemas"
import { Paper } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { format } from "date-fns"
import type { FC } from "react"
import { InfoItem } from "./InfoItem"

type SupplierOrderItemProps = Pick<Order, "order_number" | "tour_title" | "trip_date">

export const SupplierOrderItem: FC<SupplierOrderItemProps> & { Skeleton: typeof SupplierOrderItemSkeleton } = ({
	order_number,
	tour_title,
	trip_date,
}) => {
	return (
		<Paper
			color='secondary'
			className='!p-0 grid grid-cols-[40%,1px,1fr] border-l-4 border-l-green-500'
		>
			<InfoItem
				title='Номер'
				text={`#${order_number}`}
			/>
			<div className='h-full w-[1px] bg-base-140' />
			<div className='flex flex-col'>
				<InfoItem
					title='Экскурсия'
					text={
						<Typography
							textWidth='bold'
							as='span'
						>
							{tour_title}
						</Typography>
					}
				/>
				{trip_date && (
					<InfoItem
						title='Дата экскурсии'
						text={format(trip_date, "dd.MMMM.yyyy")}
					/>
				)}
			</div>
		</Paper>
	)
}

const SupplierOrderItemSkeleton = () => (
	<Paper
		color='secondary'
		className='!p-0 relative grid grid-cols-[40%,1px,1fr] border-l-4 border-l-green-500'
	>
		<InfoItem.Skeleton />
		<div className='h-full w-[1px] bg-base-140' />
		<div className='flex flex-col'>
			<InfoItem.Skeleton />
			<InfoItem.Skeleton />
		</div>
	</Paper>
)
SupplierOrderItem.Skeleton = SupplierOrderItemSkeleton
