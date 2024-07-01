"use client"

import { Icon } from "@/components/Icon"
import { FullScreenModal } from "@/components/Modals/FullScreenModal"
import { Typography } from "@/components/Typography"
import { Suspense } from "react"
import { SearchInput } from "./components/SearchInput"
import { SearchList } from "./components/SearchList"

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
