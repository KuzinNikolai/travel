import { Sheet, SheetContent, SheetTrigger } from "@share/ui"
import { BurgerIcon } from "./components/BurgerIcon"
import { BurgerSheet } from "./components/BurgerSheet"

export const BurgerMenu = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<BurgerIcon />
			</SheetTrigger>
			<SheetContent
				side='right'
				className='w-[70%]'
			>
				<BurgerSheet />
			</SheetContent>
		</Sheet>
	)
}
