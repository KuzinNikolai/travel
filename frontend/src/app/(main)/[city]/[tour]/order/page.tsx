"use client"

import { FormCreateOrder } from "@feature/createOrder"
import { Section } from "@share/ui/Layout"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"

const Order = () => {
	return (
		<>
			<HeaderWithBack />
			<Section
				title='Заказ экскурсии'
				className='h-full'
			>
				<FormCreateOrder />
			</Section>
		</>
	)
}

export default Order
