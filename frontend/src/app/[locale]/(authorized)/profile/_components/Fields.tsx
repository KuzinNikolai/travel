"use client"

import type { User } from "@share/schemas"
import { Button } from "@share/ui/Buttons"
import { useTranslations } from "next-intl"
import Link from "next/link"
import type { FC } from "react"
import { FieldItem } from "./FieldItem"
import { FieldItemWithEdit } from "./FieldWithEditButton"
import { LogoutField } from "./LogoutField"

interface FieldsProps {
	user: User
}

export const Fields: FC<FieldsProps> = ({ user }) => {
	const t = useTranslations()

	const isStaff = user.is_staff
	const fullNameExists = !!user.first_name && !!user.last_name

	return (
		<ul className='mt-10 flex list-none flex-col'>
			{isStaff && (
				<FieldItemWithEdit
					title='Описание'
					value={user.description || t("pages.profile.errors.emptyDescription")}
					isEditable={!user.description}
				/>
			)}
			<FieldItemWithEdit
				title={t("pages.profile.fields.fullName.title")}
				value={fullNameExists ? `${user.first_name} ${user.last_name}` : t("pages.profile.fields.fullName.placeholder")}
				isEditable={!fullNameExists}
			/>
			{!isStaff && (
				<FieldItem>
					<Button
						variant='ghost'
						className='!justify-start !py-6 w-full rounded-none'
						asChild
					>
						<Link href='/profile/become'>{t("pages.profile.actions.become")}</Link>
					</Button>
				</FieldItem>
			)}
			{isStaff && (
				<FieldItem>
					<Button
						variant='ghost'
						className='!justify-start !py-6 w-full rounded-none'
						asChild
					>
						<Link href='/orders'>{t("pages.profile.actions.orders")}</Link>
					</Button>
				</FieldItem>
			)}
			<FieldItem>
				{/* // TODO: Add use call to support function  */}
				<Button
					variant='ghost'
					className='!justify-start !py-6 w-full rounded-none'
				>
					{t("pages.profile.actions.support")}
				</Button>
			</FieldItem>
			<LogoutField />
		</ul>
	)
}
