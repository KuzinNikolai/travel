import { useUserTokenStore, type User } from "@entity/user"
import { useLogout } from "@feature/auth/logout"
import { Button } from "@share/ui/Buttons"
import { Typography } from "@share/ui/Text"
import Link from "next/link"
import type { FC, PropsWithChildren } from "react"

const FieldItem: FC<PropsWithChildren> = ({ children }) => {
	return <li className='after:block after:h-[1px] after:w-full after:bg-primary-400'>{children}</li>
}

interface FieldItemWithEditProps {
	title: string
	value: string
	isEditable: boolean
}

const FieldItemWithEdit: FC<FieldItemWithEditProps> = ({ title, value, isEditable }) => {
	return (
		<FieldItem>
			<div className='flex justify-between gap-1 p-4'>
				<div className='flex flex-1 flex-col gap-2'>
					<Typography
						variant='content1'
						as='p'
						className='text-primary-400'
					>
						{title}
					</Typography>
					<Typography
						variant='h5'
						as='p'
						className='text-primary-400'
					>
						{value}
					</Typography>
				</div>
				{isEditable && (
					<Button
						variant='ghost'
						className='text-accent'
						asChild
					>
						<Link href='/profile/edit'>Добавить</Link>
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
	const { getToken } = useUserTokenStore((state) => state)
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
				title={fullNameExists ? "К вам обращаться" : "Как к вам обращаться?"}
				value={fullNameExists ? `${user.first_name} ${user.first_name}` : "Фамилия и имя не указаны"}
				isEditable={!fullNameExists}
			/>
			{!isStaff && (
				<FieldItem>
					<Button
						variant='ghost'
						className='w-full justify-start rounded-none py-6 text-primary-400'
					>
						Стать гидом
					</Button>
				</FieldItem>
			)}
			{isStaff && (
				<FieldItem>
					<Button
						variant='ghost'
						className='w-full justify-start rounded-none py-6 text-primary-400'
						asChild
					>
						<Link href='/orders'>Заказы</Link>
					</Button>
				</FieldItem>
			)}
			<FieldItem>
				{/* // TODO: Add use call to support function  */}
				<Button
					variant='ghost'
					className='w-full justify-start rounded-none py-6 text-primary-400'
				>
					Поддержка
				</Button>
			</FieldItem>
			<FieldItem>
				<Button
					variant='ghost'
					onClick={() => logout.mutateAsync(getToken() || "")}
					className='w-full justify-start rounded-none py-6 text-danger'
				>
					Выйти
				</Button>
			</FieldItem>
		</ul>
	)
}