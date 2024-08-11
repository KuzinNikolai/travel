"use client"

import { SearchInput, SearchList } from "@feature/searchTour"
import { Icon } from "@share/ui/Icon"
import { FullScreenModal } from "@share/ui/Modals"
import { Typography } from "@share/ui/Text"
import { Suspense } from "react"

const SearchTrigger = (
	<button
		type='button'
		className='flex w-full max-w-[140px] items-center justify-around gap-[2px] rounded-sm bg-gray-200 p-[2px]'
	>
		<Icon name='Search' />
		<Typography>Найти тур</Typography>
	</button>
)

export const SearchMenu = () => {
	return (
		<FullScreenModal
			trigger={SearchTrigger}
			className='bg-base-170'
		>
			<header className='w-full py-sm pr-sm'>
				<FullScreenModal.CloseTrigger className='flex flex-row p-1 text-secondary [&>svg]:stroke-secondary'>
					<Icon name='ChevronLeft' /> Back
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
