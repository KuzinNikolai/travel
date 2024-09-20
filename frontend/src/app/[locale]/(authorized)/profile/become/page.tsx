import { StepsProvider } from "./_provider/stepsProvider"
import { BecomeForm } from "./_steps/form/_components/BecomeForm"
import { BecomeInfoStepPage } from "./_steps/info"

export default function Page() {
	return <StepsProvider steps={[<BecomeInfoStepPage key={"info"} />, <BecomeForm key={"form"} />]} />
}
