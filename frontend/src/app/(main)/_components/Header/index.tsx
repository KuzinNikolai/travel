"use client"

import { Icon } from "@share/ui"
import { BurgerMenu } from "@widget/BurgerMenu"
import { SearchMenu } from "@widget/Search"
import { Header as UiHeader } from "@share/ui"

export const Header = () => {
	return (
		<UiHeader
			leftColumn={
				<Icon
					name='Logo'
					className='h-auto w-[80px]'
				/>
			}
			centerColumn={<SearchMenu />}
			rightColumn={<BurgerMenu />}
			backgroundColor='bg-gray-100/70'
		/>
	)
}
