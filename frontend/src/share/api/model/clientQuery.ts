"use client"

import { Time } from "@share/lib"
import { QueryClient } from "react-query"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: Time.toMs("2m"),
		},
	},
})

export { queryClient }
