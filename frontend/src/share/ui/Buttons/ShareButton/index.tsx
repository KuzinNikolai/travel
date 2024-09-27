"use client"

import { type ComponentPropsWithRef, type MouseEventHandler, forwardRef } from "react"
import { IconButton } from "../IconButton"

interface ShareButtonProps extends Partial<ComponentPropsWithRef<typeof IconButton>> {
	shareData: ShareData
	asChild?: boolean
	onSuccess?: () => void
	onError?: () => void
}

const ShareButton = forwardRef<HTMLButtonElement, ShareButtonProps>(
	({ shareData, onSuccess, onError, onClick: cbOnClick, ...props }, ref) => {
		const onClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
			try {
				if (navigator.share) {
					navigator.share(shareData)
				} else {
					const shareDataStr = `${`${shareData.title} | `}${`${shareData.text} | `}${shareData.url}`
					navigator.clipboard.writeText(shareDataStr)
				}
			} catch (error) {
				if (error instanceof DOMException) {
					console.error(error)
				}
			}

			cbOnClick?.(e)
		}

		return (
			<IconButton
				description='Share'
				{...props}
				onClick={onClick}
				icon='Share'
				ref={ref}
			/>
		)
	},
)

ShareButton.displayName = "ShareButton"

export { ShareButton, type ShareButtonProps as IButtonProps }
