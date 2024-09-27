import { siteConfig } from "@app/configs/siteConfig"
import type { Metadata } from "next"
import type { PropsWithChildren } from "react"

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `Dashboard | %s - ${siteConfig.name}`,
	},
}

export default async function DashboardLayout({ children }: PropsWithChildren) {
	return children
}
