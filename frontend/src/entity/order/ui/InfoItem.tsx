import { Skeleton } from "@share/ui/Skeleton"
import { Typography } from "@share/ui/Text"
import type { FC, ReactNode } from "react"

interface InfoItemProps {
	title: string
	text: string | ReactNode
}

export const InfoItem: FC<InfoItemProps> & { Skeleton: typeof InfoItemSkeleton } = ({ title, text }) => {
	return (
		<Typography
			variant='contentPrimary'
			className='flex flex-col gap-sm p-sm'
		>
			<Typography as='span'>{title}</Typography>
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