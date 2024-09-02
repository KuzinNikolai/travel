import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { Section } from "@share/ui/Layout"
import { Suspense } from "react"
import { List } from "./_components/List"
import { getTours } from "@entity/tour"

const WishList = async () => {
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

export default WishList