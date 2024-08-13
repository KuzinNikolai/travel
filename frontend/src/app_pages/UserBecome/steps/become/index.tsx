import { Icon } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { BecomeForm } from "./_components/BecomeForm"
import { Container, Section } from "@share/ui/Layout"
import { getTranslations } from "next-intl/server"

export const metadata = {
	title: "Become supplier",
}

export const BecomeStep = async () => {
	const t = await getTranslations()

	return (
		<Section
			className='flex-1'
			contentProps={{ className: "flex flex-col items-center justify-start gap-md" }}
		>
			<Icon
				name='Logo'
				className='w-48'
			/>
			<Typography
				variant='contentPrimary'
				textAlign='center'
			>
				{t("pages.become.form.title")}
			</Typography>
			<BecomeForm />
		</Section>
	)
}
