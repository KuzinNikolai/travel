"use client"

import { Icon } from "@/components/Icon"
import { BurgerMenu } from "@/widgets/BurgerMenu"
import { SearchMenu } from "@/widgets/Search"
import { Header as UiHeader } from "@components/Headers/Base"

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
