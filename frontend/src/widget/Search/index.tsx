"use client"

import { SearchInput, SearchList } from "@feature/searchTour"
import { Icon } from "@share/ui/Icon"
import { FullScreenModal } from "@share/ui/Modals"
import { Typography } from "@share/ui/Text"
import { Suspense } from "react"

const SearchTrigger = (
	<button
		type='button'
		className='flex w-full max-w-[140px] items-center justify-around gap-1 rounded-xl bg-gray-200 p-2'
	>
		<Icon name='Search' />
		<Typography variant='span'>Найти тур</Typography>
	</button>
)

export const SearchMenu = () => {
	return (
		<FullScreenModal
			trigger={SearchTrigger}
			className='bg-background'
		>
			<header className='w-full py-2 pr-1'>
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
