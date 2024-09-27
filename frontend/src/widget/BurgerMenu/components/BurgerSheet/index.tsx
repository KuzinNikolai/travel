"use client"

import { useUser } from "@entity/user"
import { Icon } from "@share/ui/Icon"
import { NavigationItem } from "./components/NavigationItem"
import { UserInfo } from "./components/UserInfo"
import { useTranslations } from "next-intl"

export interface Navigation {
	name: string
	href: string
	description?: string
	show: boolean
	icon: JSX.Element
}

export const BurgerSheet = () => {
	const t = useTranslations("components.burgerMenu")

	const {
		query: { data: user, isFetched, isSuccess },
	} = useUser()

	const isAuthorized = !!user && isFetched && isSuccess

	const navigation = [
		{
			name: t("navigation.myOrders.title"),
			href: "/orders",
			description: t("navigation.myOrders.description"),
			show: isAuthorized,
			icon: (
				<Icon
					name='Wallet'
					className='h-6 w-6 stroke-primary-400'
				/>
			),
		},
		{
			name: t("navigation.wishlist"),
			href: "/wishlist",
			show: true,
			icon: (
				<Icon
					name='Star'
					className='h-6 w-6 stroke-primary-400'
				/>
			),
		},
	] satisfies Navigation[]

	return (
		<div className='mt-4 flex flex-col gap-6'>
			<UserInfo />
			<nav>
				<ul className='flex flex-col gap-3 overflow-y-auto'>
					{navigation.map(
						(item, index) =>
							item.show && (
								<NavigationItem
									key={index + item.href}
									navigation={item}
								/>
							),
					)}
				</ul>
			</nav>
		</div>
	)
}
