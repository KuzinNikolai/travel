import type { FC } from "react"
import styles from "./BurgerIcon.module.css"

import { cn } from "@share/packages/tailwindHelpers"

interface BurgerIconProps {
	isActive: boolean
}

export const BurgerIcon: FC<BurgerIconProps> = ({ isActive }) => {
	return (
		<div
			className={cn(
				"relative h-[20px] w-[20px] border-none bg-transparent p-none [&:hover>span]:bg-base-80",
				isActive && styles["burger--active"],
			)}
		>
			<span className={cn(styles.burger__line, "bg-base-20")} />
			<span className={cn(styles.burger__line, "bg-base-20")} />
			<span className={cn(styles.burger__line, "bg-base-20")} />
		</div>
	)
}
