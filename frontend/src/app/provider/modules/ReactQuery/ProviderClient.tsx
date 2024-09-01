"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, type FC, type PropsWithChildren } from "react"

export const ProviderClient: FC<PropsWithChildren> = ({ children }) => {
	const [client] = useState(new QueryClient())

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
