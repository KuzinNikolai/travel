import { SupplierOrders } from "@pages/SupplierOrders"
import type { PagesProps } from "@share/lib"
import { unstable_setRequestLocale } from "next-intl/server"

export default async function SupplierOrdersPage({ params }: PagesProps<{ locale: string }>) {
	unstable_setRequestLocale(params.locale)

	return <SupplierOrders />
}
