import { Slot } from "@radix-ui/react-slot"
import type { FC, HTMLAttributes } from "react"
import { paperVariants, type PaperVariants } from "./variants"

interface PaperProps extends Omit<HTMLAttributes<HTMLElement>, keyof PaperVariants>, PaperVariants {
	asChild?: boolean
}

export const Paper: FC<PaperProps> = ({ className, color, radius, size, asChild, children, ...props }) => {
	const Comp = asChild ? Slot : "div"

	return (
		<Comp
			className={paperVariants({ color, radius, size, className })}
			{...props}
		>
			{children}
		</Comp>
	)
}
