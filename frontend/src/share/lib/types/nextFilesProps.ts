import type { ReactNode } from "react"

export interface IPagesProps<T extends Record<string, string> = Record<string, string>> {
	params: {
		slugs: string[]
	} & T
	searchParams: Record<string, string | string[] | undefined>
}

export type LayoutProps<T extends Record<string, ReactNode> = Record<string, ReactNode>> = T & {
	children: ReactNode
}
