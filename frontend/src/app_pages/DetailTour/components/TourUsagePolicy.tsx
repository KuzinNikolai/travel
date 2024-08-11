import { Button } from "@share/ui/Buttons"
import { Section } from "@share/ui/Layout"
import { Drawer } from "@share/ui/Modals"
import { Typography } from "@share/ui/Text"
import type { FC } from "react"

interface ITourUsagePolicy {
	usagePolicy: string
}

export const TourUsagePolicy: FC<ITourUsagePolicy> = ({ usagePolicy }) => {
	return (
		<Section
			title='Политика использования'
			header={
				usagePolicy.length > 130 ? (
					<Drawer
						title='Политика использования'
						trigger={<Button variant="outline">Читать далее</Button>}
					>
						<Typography variant='contentPrimary' className="leading-5">{usagePolicy}</Typography>
					</Drawer>
				) : null
			}
		>
			<Typography
				variant='contentPrimary'
				className="line-clamp-3 text-primary-400 leading-5"
			>
				{usagePolicy}
			</Typography>
		</Section>
	)
}
