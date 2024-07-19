import type { Metadata } from "next"

interface SiteConfig extends Metadata {
	name: string
}

export const siteConfig = {
	name: "Gettrip",
	description: "The best travel agency",
} satisfies SiteConfig
