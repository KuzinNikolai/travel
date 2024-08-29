"use client"

import type { User } from "@entity/user"
import { Typography } from "@share/ui/Text"
import Link from "next/link"
import type { FC } from "react"
import { ListItem } from "./ListItem"
import { useTranslations } from "next-intl"
import { Skeleton } from "@share/ui/Skeleton"

interface OrderTouristsInfoProps {
	user: User | null
}

export const OrderTouristsInfo: FC<OrderTouristsInfoProps> & { Skeleton: typeof OrderTouristsInfoSkeleton } = ({
	user,
}) => {
	const t = useTranslations()

	if (user === null) {
		return <Typography variant='h7'>{t("errors.touristNotFound")}</Typography>
	}

	return (
		<section>
			<Typography
				variant='h6'
				as='h2'
			>
				{t('pages.SupplierDetailOrder.sections.touristInfo')}
			</Typography>
			<ul className='mt-sm flex flex-col gap-2'>
				<ListItem title={t("pages.SupplierDetailOrder.fields.fullName")}>
					{user.first_name || user.last_name ? (
						<Typography>{`${user?.first_name} ${user.last_name}`}</Typography>
					) : (
						<Typography>{user.username}</Typography>
					)}
				</ListItem>
				<ListItem title={t("pages.SupplierDetailOrder.fields.email")}>
					<Typography asChild>
						<Link href={`mailto:${user.email}`}>{user.email}</Link>
					</Typography>
				</ListItem>
				<ListItem title={t("share.phoneNumber")}>
					<Typography asChild>
						{user.phone ? (
							<Link href={`tel:${user.phone}`}>{user.phone}</Link>
						) : (
							<Typography>{t("share.notSpecified")}</Typography>
						)}
					</Typography>
				</ListItem>
			</ul>
		</section>
	)
}

const OrderTouristsInfoSkeleton = () => (
	<div>
		<Skeleton className='h-6 w-1/3' />
		<ul className='mt-sm flex flex-col gap-2'>
			{new Array(3).fill(0).map((_, index) => (
				<ListItem.Skeleton key={index}>
					<Skeleton className='h-6 w-3/4' />
				</ListItem.Skeleton>
			))}
		</ul>
	</div>
)
OrderTouristsInfo.Skeleton = OrderTouristsInfoSkeleton