import { siteConfig } from "@app/configs/siteConfig"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `Dashboard | %s - ${siteConfig.name}`,
	},
}
