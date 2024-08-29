import { Paper } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { isValidElement, ReactElement, type FC, type ReactNode } from "react"
import type { Order } from "../model/schemas/order.schema"
import { format } from "date-fns"
import Link from "next/link"
import { Skeleton } from "@share/ui/Skeleton"

type SupplierOrderItemProps = Pick<Order, "order_number" | "tour_title" | "trip_date">

interface InfoItemProps {
	title: string
	text: string | ReactNode
}

const InfoItem: FC<InfoItemProps> & { Skeleton: typeof InfoItemSkeleton } = ({ title, text }) => {
	return (
		<Typography
			variant='contentPrimary'
			className='flex flex-col gap-sm p-sm'
		>
			<Typography>{title}</Typography>
			{typeof text === "string" ? (
				<Typography
					variant='contentLarge'
					className='text-green-500'
					as='span'
				>
					{text}
				</Typography>
			) : (
				text
			)}
		</Typography>
	)
}

const InfoItemSkeleton = () => (
	<div className='flex flex-col gap-sm p-sm'>
		<Skeleton className='h-6 w-1/4' />
		<Skeleton className='h-6 w-1/2' />
	</div>
)
InfoItem.Skeleton = InfoItemSkeleton

export const SupplierOrderItem: FC<SupplierOrderItemProps> & { Skeleton: typeof SupplierOrderItemSkeleton } = ({
	order_number,
	tour_title,
	trip_date,
}) => {
	return (
		<Paper
			color='secondary'
			className='!p-0 relative grid grid-cols-[40%,1px,1fr] border-l-4 border-l-green-500'
		>
			<Link
				href={`/profile/orders/${order_number}`}
				className='absolute top-0 right-0 bottom-0 left-0'
			/>
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
						text={format(trip_date, "dd MMMM yyyy")}
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
