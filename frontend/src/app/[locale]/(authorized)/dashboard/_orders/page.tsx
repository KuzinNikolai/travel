import { Header } from "@share/ui/Headers"
import { Section } from "@share/ui/Layout"
import { getTranslations } from "next-intl/server"
import { OrderList } from "./_components/OrderList"

export const dynamic = "force-dynamic"

export default async function SupplierOrders() {
	const t = await getTranslations()

	return (
		<>
			<Header title={t("pages.supplierOrderList.title")} />
			<Section
				className='flex-1'
				containerClassNames='!p-none'
			>
				<OrderList />
			</Section>
		</>
	)
}
