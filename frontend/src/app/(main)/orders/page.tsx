import { getTours } from "@entity/tour"
import { Section } from "@share/ui/Layout"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { Suspense } from "react"
import { List } from "./List"

const Orders = async () => {
	const tours = await getTours()

	return (
		<>
			<HeaderWithBack />
			<Section
				title='wishlist'
				hiddenTitle
				className='flex flex-1 flex-col'
				containerClassNames='flex-1'
			>
				<Suspense>
					<List tours={tours} />
				</Suspense>
			</Section>
		</>
	)
}

export default Orders
