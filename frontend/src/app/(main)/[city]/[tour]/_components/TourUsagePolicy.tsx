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
						trigger={
							<Button className='text-red-500 hover:text-red-600'>
								<Typography
									variant='button'
									as='span'
									textWidth='medium'
									textAlign='right'
								>
									Читать далее
								</Typography>
							</Button>
						}
					>
						<Typography variant='content2'>{usagePolicy}</Typography>
					</Drawer>
				) : null
			}
		>
			<Typography
				variant='content2'
				className='line-clamp-3 text-primary-400'
			>
				{usagePolicy}
			</Typography>
		</Section>
	)
}
