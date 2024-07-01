import { Skeleton } from "@/components/Skeleton"

export const SearchItemLoading = () => {
	return (
		<li
			aria-label='Загрузка'
			className='flex items-center gap-2'
		>
			<Skeleton className='h-4 w-4' />
			<Skeleton className='h-4 w-[60vw]' />
		</li>
	)
}
