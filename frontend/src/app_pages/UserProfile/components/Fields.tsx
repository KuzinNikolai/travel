import type { User } from "@entity/user"
import { useLogout } from "@feature/auth/logout"
import { Button } from "@share/ui/Buttons"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import Link from "next/link"
import type { FC, PropsWithChildren } from "react"

const FieldItem: FC<PropsWithChildren> = ({ children }) => {
	return (
		<li className='after:block after:h-[1px] after:w-full after:bg-base-140 [&>div]:py-4 [&>div]:first-of-type:pt-none'>
			{children}
		</li>
	)
}

interface FieldItemWithEditProps {
	title: string
	value: string
	isEditable: boolean
}

const FieldItemWithEdit: FC<FieldItemWithEditProps> = ({ title, value, isEditable }) => {
	const t = useTranslations("pages.profile")

	return (
		<FieldItem>
			<div className='flex justify-between gap-sm'>
				<div className='flex flex-1 flex-col gap-sm'>
					<Typography
						variant='contentPrimary'
						className='text-primary-400'
					>
						{title}
					</Typography>
					<Typography
						variant='h6'
						className='text-primary-400'
					>
						{value}
					</Typography>
				</div>
				{isEditable && (
					<Button
						variant='ghost'
						className='text-primary-50'
						asChild
					>
						<Link href='/profile/edit'>{t("actions.add")}</Link>
					</Button>
				)}
			</div>
		</FieldItem>
	)
}

interface FieldsProps {
	user: User
}

export const Fields: FC<FieldsProps> = ({ user }) => {
	const t = useTranslations("pages.profile")

	const logout = useLogout()

	const isStaff = user.is_staff
	const fullNameExists = !!user.first_name && !!user.last_name

	return (
		<ul className='mt-10 flex list-none flex-col'>
			{isStaff && (
				<FieldItemWithEdit
					title='Описание'
					value={user.description || "Описание не указано"}
					isEditable={!user.description}
				/>
			)}
			<FieldItemWithEdit
				title={t("fields.fullName.title")}
				value={fullNameExists ? `${user.first_name} ${user.last_name}` : t("fields.fullName.placeholder")}
				isEditable={!fullNameExists}
			/>
			{!isStaff && (
				<FieldItem>
					<Button
						variant='ghost'
						className='!justify-start !py-6 w-full rounded-none'
						asChild
					>
						<Link href='/profile/become/info'>{t("actions.become")}</Link>
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
						<Link href='profile/orders'>{t("actions.orders")}</Link>
					</Button>
				</FieldItem>
			)}
			<FieldItem>
				{/* // TODO: Add use call to support function  */}
				<Button
					variant='ghost'
					className='!justify-start !py-6 w-full rounded-none'
				>
					{t("actions.support")}
				</Button>
			</FieldItem>
			<FieldItem>
				<Button
					variant='ghost'
					onClick={() => logout.mutateAsync({ input: {} })}
					className='!justify-start !py-6 w-full rounded-none text-danger'
				>
					{t("actions.logout")}
				</Button>
			</FieldItem>
		</ul>
	)
}
