import type { INavigation } from "@entity/navigation.entity"
import { Icon } from "@share/ui/Icon"
import type { Metadata } from "next"

interface SiteConfig extends Metadata {
	name: string
	navigation: INavigation[]
}

export const siteConfig = {
	name: "trevel",
	description: "The best travel agency",

	navigation: [
		{
			name: "Мои заказы",
			href: "/orders",
			description: "Заказы за всё время",
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
			icon: (
				<Icon
					name='Star'
					className='h-6 w-6 stroke-primary-400'
				/>
			),
		},
	],
} satisfies SiteConfig
