import type { PagesProps } from "@share/types"
import { StepsProvider } from "./_provider/stepsProvider"
import { BecomeFormStep } from "./_steps/form"
import { BecomeInfoStep } from "./_steps/info"

export default function Page({ params }: PagesProps) {
	const locale = params.locale

	return (
		<StepsProvider
			info={<BecomeInfoStep locale={locale} />}
			form={<BecomeFormStep />}
		/>
	)
}
