"use client"

import { QueryClientProvider } from "react-query"
import { queryClient } from "../model/clientQuery"

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
