import { BaseHeader } from "@share/ui/Headers/BaseHeader"
import { Icon } from "@share/ui/Icon"
import { BurgerMenu } from "@widget/BurgerMenu"
import { SearchMenu } from "@widget/Search"
import { getTranslations } from "next-intl/server"

export const Header = async () => {
	const t = await getTranslations()
	
	return (
		<BaseHeader
			leftColumn={
				<Icon
					name='Logo'
					aria-label={t("share.logo")}
					className='h-auto w-[80px]'
				/>
			}
			centerColumn={<SearchMenu />}
			rightColumn={<BurgerMenu />}
			backgroundColor='bg-gray-100/70'
		/>
	)
}
