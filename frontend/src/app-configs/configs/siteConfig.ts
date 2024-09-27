import type { Metadata } from "next"

interface SiteConfig extends Metadata {
	name: string
	origin: string
}

export const siteConfig = {
	name: "Gettrip",
	description: "The best travel agency",
	creator: "Gettrip.co",
	origin: "https://gettrip.co",
} satisfies SiteConfig
