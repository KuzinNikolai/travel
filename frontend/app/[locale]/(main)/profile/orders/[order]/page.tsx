import { SupplierDetailOrder } from "@pages/SupplierDetailOrder"
import type { PagesProps } from "@share/lib"

export default async function SupplierDetailOrderPage({ params }: PagesProps<{ locale: string; order: string }>) {
	return <SupplierDetailOrder order={params.order} />
}
