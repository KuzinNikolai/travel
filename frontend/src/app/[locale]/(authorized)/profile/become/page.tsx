import type { PagesProps } from "@share/types"
import { StepsProvider } from "./_provider/stepsProvider"
import { BecomeForm } from "./_steps/form/_components/BecomeForm"
import { BecomeInfoStep } from "./_steps/info"

export default function Page({ params }: PagesProps) {
	const locale = params.locale

	return (
		<StepsProvider
			info={<BecomeInfoStep locale={locale} />}
			form={<BecomeForm />}
		/>
	)
}
