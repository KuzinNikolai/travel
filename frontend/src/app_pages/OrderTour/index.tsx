import { FormCreateOrder } from "@feature/order/createOrder"
import { Section } from "@share/ui/Layout"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"

export const OrderTour = () => {
	return (
		<>
			<HeaderWithBack title='Заказ экскурсии' />
			<Section className='h-full'>
				<FormCreateOrder />
			</Section>
		</>
	)
}
