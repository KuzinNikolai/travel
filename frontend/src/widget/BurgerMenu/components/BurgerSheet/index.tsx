import { siteConfig } from "@share/config"
import { NavigationItem } from "./components/NavigationItem"
import { UserInfo } from "./components/UserInfo"

export const BurgerSheet = () => {
	return (
		<div className='mt-4 flex flex-col gap-6'>
			{/* <UserInfo /> */}
			<nav>
				<ul className='flex flex-col gap-3 overflow-y-auto'>
					{siteConfig.navigation.map((item, index) => (
						<NavigationItem
							key={index + item.href}
							navigation={item}
						/>
					))}
				</ul>
			</nav>
		</div>
	)
}
