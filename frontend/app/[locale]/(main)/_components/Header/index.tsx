"use client"

import { Icon } from "@share/ui/Icon"
import { BurgerMenu } from "@widget/BurgerMenu"
import { SearchMenu } from "@widget/Search"
import { BaseHeader as UiHeader } from "@share/ui/Headers/BaseHeader"

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
