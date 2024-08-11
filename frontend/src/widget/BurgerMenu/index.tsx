"use client"

import { Sheet, SheetContent, SheetTrigger } from "@share/ui/Modals"
import { BurgerIcon } from "./components/BurgerIcon"
import { BurgerSheet } from "./components/BurgerSheet"
import { useState } from "react"

export const BurgerMenu = () => {
	const [show, setShow] = useState(false)

	return (
		<Sheet
			open={show}
			onOpenChange={(open) => setShow(open)}
		>
			<SheetTrigger>
				<BurgerIcon isActive={show} />
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
