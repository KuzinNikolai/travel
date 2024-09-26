import { Button } from "@share/ui/Buttons"
import { Typography } from "@share/ui/Text"
import { Link } from "lucide-react"
import { useTranslations } from "next-intl"
import type { FC } from "react"
import { FieldItem } from "./FieldItem"

interface FieldItemWithEditProps {
	title: string
	value: string
	isEditable: boolean
}

export const FieldItemWithEdit: FC<FieldItemWithEditProps> = ({ title, value, isEditable }) => {
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
