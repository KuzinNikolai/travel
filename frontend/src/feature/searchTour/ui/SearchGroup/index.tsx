import { useSearchParams } from "@share/packages/reactHelpers"
import type { FC, ReactNode } from "react"
import type { z } from "zod"
import type { searchGroupSchema } from "../../consts/search.schema"

interface SearchGroupProps extends Omit<z.infer<typeof searchGroupSchema>, "items"> {
	children: ReactNode
}

const SearchGroup: FC<SearchGroupProps> = ({ id, children }) => {
	const searchParam = useSearchParams<"q">()

	return (
		<li
			key={id}
			className={
				searchParam.getSearchParam("q")
					? "[&:not(:last-child)]:after:mt-2 [&:not(:last-child)]:after:block [&:not(:last-child)]:after:content-[''] [&]:after:h-[1px] [&]:after:w-full [&]:after:bg-black/20"
					: ""
			}
		>
			<ul className='flex flex-col gap-2'>{children}</ul>
		</li>
	)
}

export { SearchGroup }
