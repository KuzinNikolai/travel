"use client"

import { createDebounce } from "@share/helpers"
import { useSearchParams } from "@share/packages/reactHelpers"
import { Input } from "@share/ui/Inputs"
import { useTranslations } from "next-intl"
import { useState } from "react"

const debounce = createDebounce((query: string, setParam: (key: "q", value: string) => void) => {
	setParam("q", query)
}, 600)

export const SearchInput = () => {
	const t = useTranslations("components.searchTour")

	const { getSearchParam, setSearchParam } = useSearchParams<"q">()
	const [query, setQuery] = useState(getSearchParam("q") || "")

	return (
		<Input
			type='text'
			name='Search'
			placeholder={t("placeholder")}
			className='bg-base-160'
			value={query}
			onInput={(e) => {
				setQuery(e.currentTarget.value)
				debounce(e.currentTarget.value, setSearchParam)
			}}
		/>
	)
}
