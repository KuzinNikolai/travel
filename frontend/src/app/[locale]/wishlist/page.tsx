import { getTours } from "@entity/tour"
import { isErrorResponse } from "@share/packages/fetcher"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack"
import { Suspense } from "react"
import { List } from "./_components/List"

export default async function WishList() {
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
					{!isErrorResponse(tours) ? (
						<List tours={tours} />
					) : (
						<Typography>Ошибка с получением данных о турах</Typography>
					)}
				</Suspense>
			</Section>
		</>
	)
}
