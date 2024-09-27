import type { FC, PropsWithChildren } from "react"

export const FieldItem: FC<PropsWithChildren> = ({ children }) => {
	return (
		<li className='after:block after:h-[1px] after:w-full after:bg-base-140 [&>div]:py-4 [&>div]:first-of-type:pt-none'>
			{children}
		</li>
	)
}
