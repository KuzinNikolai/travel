import { Header } from "@share/ui/Headers"
import { Section } from "@share/ui/Layout"
import { OrderList } from "./components/OrderList"

export const SupplierOrders = () => {
	return (
		<>
			<Header title='Заказы гида' />
			<Section className='flex-1' containerClassNames="!p-none">
				<OrderList />
			</Section>
		</>
	)
}
