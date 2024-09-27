"use client"

import { SearchInput, SearchList } from "@feature/searchTour"
import { Button } from "@share/ui/Buttons"
import { Icon } from "@share/ui/Icon"
import { FullScreenModal } from "@share/ui/Modals"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import { Suspense } from "react"

export const SearchMenu = () => {
	const t = useTranslations()

	return (
		<FullScreenModal
			title={t("components.searchTour.action")}
			className='bg-base-170'
			trigger={
				<Button
					type='button'
					size='sm'
					className='!bg-base-150 rounded-[10px]'
				>
					<Icon name='Search' />
					<Typography
						variant='contentLarge'
						as='span'
					>
						{t("components.searchTour.action")}
					</Typography>
				</Button>
			}
		>
			<header className='w-full py-sm pr-sm'>
				<FullScreenModal.CloseTrigger className='flex flex-row p-1 text-secondary [&>svg]:stroke-secondary'>
					<Icon name='ChevronLeft' /> {t("share.back")}
				</FullScreenModal.CloseTrigger>
			</header>

			<div className='flex h-[300px] w-full flex-col gap-4 p-2'>
				<Suspense>
					<SearchInput />
				</Suspense>
				<Suspense>
					<SearchList />
				</Suspense>
			</div>
		</FullScreenModal>
	)
}
