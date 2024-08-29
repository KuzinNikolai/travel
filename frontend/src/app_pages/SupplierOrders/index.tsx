import { Header } from "@share/ui/Headers"
import { Section } from "@share/ui/Layout"
import { OrderList } from "./components/OrderList"
import { getTranslations } from "next-intl/server"

export const SupplierOrders = async () => {
	const t = await getTranslations()

	return (
		<>
			<Header title={t('pages.supplierOrderList.title')} />
			<Section className='flex-1' containerClassNames="!p-none">
				<OrderList />
			</Section>
		</>
	)
}
