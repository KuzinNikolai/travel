"use client"

import { createDebounce, useSearchParams } from "@share/lib"
import { Input } from "@share/ui/Inputs"
import { useState } from "react"

const debounce = createDebounce((query: string, setParam: (key: "q", value: string) => void) => {
	setParam("q", query)
}, 600)

export const SearchInput = () => {
	const { getSearchParam, setSearchParam } = useSearchParams<"q">()
	const [query, setQuery] = useState(getSearchParam("q") || "")

	return (
		<Input
			type='text'
			name='Search'
			placeholder='Поиск'
			className='bg-gray-400/20'
			value={query}
			onInput={(e) => {
				setQuery(e.currentTarget.value)
				debounce(e.currentTarget.value, setSearchParam)
			}}
		/>
	)
}
