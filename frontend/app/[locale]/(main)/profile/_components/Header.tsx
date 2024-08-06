import { Button } from "@share/ui/Buttons"
import { Header } from "@share/ui/Headers"
import { Icon } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"
import Link from "next/link"
import type { FC } from "react"

interface HeaderProps {
	type: "user" | "guide"
}

export const ProfileHeader: FC<HeaderProps> = ({ type }) => {
	return (
		<Header
			title={type === "user" ? "Профиль" : "Профиль гида"}
			action={
				<Button
					variant='ghost'
					asChild
				>
					<Link href='/profile/edit'>
						<Typography
							variant='span'
							className='sr-only md:not-sr-only'
						>
							Редактировать
						</Typography>
						<Icon
							name='Pencil'
							className='h-5 w-5 md:hidden'
							aria-disabled
						/>
					</Link>
				</Button>
			}
		/>
	)
}
