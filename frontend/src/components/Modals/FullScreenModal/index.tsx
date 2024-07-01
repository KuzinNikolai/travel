"use client"

import { Dialog, DialogClose, DialogTrigger } from "@/components/@ui/dialog"
import { Portal } from "@/components/Portal"
import { Container } from "@/components/layout/Container"
import { DialogContent } from "@radix-ui/react-dialog"
import clsx from "clsx"
import { type FC, type PropsWithChildren, useEffect } from "react"

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
				<DialogContent className={clsx("fixed top-0 left-0 z-50 h-full w-full", className)}>
					<Container>{children}</Container>
				</DialogContent>
			</Portal>
		</Dialog>
	)
}

FullScreenModal.CloseTrigger = DialogClose
