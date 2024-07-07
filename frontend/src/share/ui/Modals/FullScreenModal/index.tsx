"use client"

import { DialogContent } from "@radix-ui/react-dialog"
import { cn } from "@share/lib"
import type { FC, PropsWithChildren } from "react"
import { Dialog, DialogClose, DialogTrigger } from "../Dialog"
import { Portal } from "@share/ui/Portal"
import { Container } from "@share/ui/Layout"

interface IFullScreenModalSubComponents {
	CloseTrigger: typeof DialogClose
}

interface IFullScreenModalProps extends PropsWithChildren {
	trigger?: React.ReactNode
	expand?: boolean
	onOpenChange?: (open: boolean) => void
	className?: string
}

const openChange = (open: boolean) => {
	if (open) {
		document.body.style.overflow = "hidden"
	} else {
		document.body.style.overflow = "auto"
	}
}

export const FullScreenModal: FC<IFullScreenModalProps> & IFullScreenModalSubComponents = ({
	expand,
	trigger,
	className,
	onOpenChange,
	children,
}) => {
	return (
		<Dialog
			open={expand}
			onOpenChange={(expand) => (openChange(expand), onOpenChange?.(expand))}
		>
			{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
			<Portal>
				<DialogContent className={cn("fixed top-0 left-0 z-50 h-full w-full", className)}>
					<Container>{children}</Container>
				</DialogContent>
			</Portal>
		</Dialog>
	)
}

FullScreenModal.CloseTrigger = DialogClose
