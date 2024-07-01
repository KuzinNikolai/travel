import { BackHeader } from "@/components/Headers/BackHeader"
import { Section } from "@/components/layout/Section"
import { getTours } from "@/packages/API/fetches/tours"
import { Suspense } from "react"
import { List } from "./List"

const WishList = async () => {
	const tours = (await getTours()) || []

	return (
		<>
			<BackHeader />
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

export default WishList
