import { cn } from "@share/lib"
import type { FC, HTMLAttributes, PropsWithChildren } from "react"

interface ListProps extends HTMLAttributes<HTMLDivElement> {
	orientation: "vertical" | "horizontal"
	showDivider?: boolean
}

export const List: FC<ListProps> = ({ orientation, showDivider = false, children, ...props }) => (
	<div
		{...props}
		className={cn(
			"flex ",
			(
				{
					vertical: "flex-col",
					horizontal: "flex-row",
				} satisfies Record<ListProps["orientation"], string>
			)[orientation],
			showDivider
				? "gap-md [&>*:last-of-type]:after:h-0 [&>*]:after:mt-md [&>*]:after:block [&>*]:after:h-[1px] [&>*]:after:w-full [&>*]:after:bg-base-140"
				: "gap-sm",
			props.className,
		)}
	>
		{children}
	</div>
)
