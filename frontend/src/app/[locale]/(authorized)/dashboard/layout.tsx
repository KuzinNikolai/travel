import { defender } from "@share/packages/auth"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

export const dynamic = "force-dynamic"

export default async function DashboardLayout({ children }: PropsWithChildren) {
	const isStaff = await defender.isStaff()

	if (!isStaff) {
		notFound()
	}

	return children
}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations()

	return {
		title: {
			default: t("pages.dashboard.meta.title-template"),
			template: `%s - ${t("pages.dashboard.meta.title-template")}`,
		},
		description: `${t("pages.dashboard.meta.description")}`,
		robots: {
			index: false,
			follow: false,
		},
	}
}
