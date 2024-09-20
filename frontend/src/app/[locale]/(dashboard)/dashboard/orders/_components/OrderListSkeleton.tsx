import { SupplierOrderItem } from "@entity/order";

export function OrderListSkeleton() {
	return (
		<div className='flex flex-col gap-sm'>
			{new Array(5).fill(0).map((_, index) => (
				<SupplierOrderItem.Skeleton key={index} />
			))}
		</div>
	)
}
