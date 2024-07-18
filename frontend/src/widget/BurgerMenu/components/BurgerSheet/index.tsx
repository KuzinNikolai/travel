"use client"

import type { Navigation } from "@entity/navigation.entity"
import { useUser } from "@entity/user"
import { Icon } from "@share/ui/Icon"
import { NavigationItem } from "./components/NavigationItem"
import { UserInfo } from "./components/UserInfo"

const navigation = (isAuthorized = false) =>
	[
		{
			name: "Мои заказы",
			href: "/orders",
			description: "Заказы за всё время",
			show: isAuthorized,
			icon: (
				<Icon
					name='Wallet'
					className='h-6 w-6 stroke-primary-400'
				/>
			),
		},
		{
			name: "Wishlist",
			href: "/wishlist",
			description: "lorem ipsum",
			show: true,
			icon: (
				<Icon
					name='Star'
					className='h-6 w-6 stroke-primary-400'
				/>
			),
		},
	] satisfies Navigation[]

export const BurgerSheet = () => {
	const { data: user } = useUser()

	return (
		<div className='mt-4 flex flex-col gap-6'>
			<UserInfo />
			<nav>
				<ul className='flex flex-col gap-3 overflow-y-auto'>
					{navigation(!!user).map(
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
