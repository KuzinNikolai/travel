import { cn } from "@share/lib"
import { Typography } from "@share/ui/Text"
import type { ComponentProps, ComponentPropsWithRef, FC, HTMLAttributes, ReactElement } from "react"
import { Container } from "../Container"
import { Paper } from "../Paper"
import React from "react"

interface ContainerProps extends Omit<ComponentPropsWithRef<typeof Paper>, "title"> {
	title?: string | ReactElement
	hiddenTitle?: boolean
	header?: ReactElement | null
	containerClassNames?: string
	contentProps?: HTMLAttributes<HTMLDivElement>
}

export const Section: FC<ContainerProps> = ({
	className,
	header,
	title,
	hiddenTitle = false,
	children,
	containerClassNames,
	contentProps,
	...props
}) => {
	return (
		<Paper
			color='primary'
			asChild
			className={cn("py-md", className)}
			{...props}
		>
			<section>
				<Container className={cn("flex flex-col", !hiddenTitle || header ? "gap-md" : "", containerClassNames)}>
					{(header || title) && (
						<div className='flex items-center justify-between'>
							{typeof title === "string" ? (
								<Typography
									variant='h4'
									as='h2'
									className={hiddenTitle ? "sr-only" : undefined}
								>
									{title}
								</Typography>
							) : (
								title
							)}
							{header}
						</div>
					)}
					<div
						{...contentProps}
						className={cn("flex flex-col gap-md", contentProps?.className)}
					>
						{children}
					</div>
				</Container>
			</section>
		</Paper>
	)
}
