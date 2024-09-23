"use client"

import { Button } from "@share/ui/Buttons"
import { Header } from "@share/ui/Headers"
import { Icon } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import Link from "next/link"
import type { FC } from "react"

interface HeaderProps {
	type: "user" | "guide"
}

export const ProfileHeader: FC<HeaderProps> = ({ type }) => {
	const t = useTranslations("pages.profile")

	return (
		<Header
			title={type === "user" ? t("type.userProfile") : t("type.supplierProfile")}
			action={
				<Button
					variant='ghost'
					asChild
				>
					<Link href='/profile/edit'>
						<Typography
							variant='contentPrimary'
							className='sr-only md:not-sr-only'
						>
							{t("actions.edit")}
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
