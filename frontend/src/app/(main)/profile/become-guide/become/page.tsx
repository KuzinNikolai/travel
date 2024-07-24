import { Icon } from "@share/ui/Icon"
import { Typography } from "@share/ui/Text"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { BecomeForm } from "./_components/BecomeForm"
import { Container } from "@share/ui/Layout"

export const metadata = {
	title: "Become guide",
}

export const dynamic = "force-static"

const BecomePage = () => {
	return (
		<>
			<HeaderWithBack />
			<Container className="mt-4 flex flex-col items-center justify-center gap-4">
				<Icon name='Logo' className="w-48" />
				<Typography variant='content1' textAlign="center">
					Выберете страну и город проведения вашей экскурсий и номер телефона для связи
				</Typography>
				<BecomeForm />
			</Container>
		</>
	)
}

export default BecomePage
