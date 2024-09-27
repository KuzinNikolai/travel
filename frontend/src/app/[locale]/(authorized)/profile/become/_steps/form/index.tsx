import { Icon } from "@share/ui/Icon"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { getTranslations } from "next-intl/server"
import { BecomeForm } from "./_components/BecomeForm"

export const BecomeFormStep = async () => {
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
