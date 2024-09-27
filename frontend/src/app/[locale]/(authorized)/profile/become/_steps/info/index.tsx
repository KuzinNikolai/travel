import { print } from "@share/packages/logger"
import { safe } from "@share/packages/safeApi"
import { Section } from "@share/ui/Layout"
import { notFound } from "next/navigation"
import type { FC } from "react"

interface BecomeInfoStepProps {
	locale: string
}

export const BecomeInfoStep: FC<BecomeInfoStepProps> = async ({ locale }) => {
	const { success, data: Mdx, error } = await safe(import(`./locales/${locale}.mdx`))

	if (!success) {
		print.fatal(error)
		notFound()
	}

	return (
		<Section>
			<Mdx.default />
		</Section>
	)
}
