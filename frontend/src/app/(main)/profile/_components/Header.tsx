import { Button } from "@share/ui/Buttons"
import { Header } from "@share/ui/Headers"
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
					<Link href='/profile/edit'>Редактировать</Link>
				</Button>
			}
		/>
	)
}
