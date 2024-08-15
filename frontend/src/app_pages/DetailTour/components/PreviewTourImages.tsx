"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselLengthViewer } from "@share/ui/Carousel"
import { Image } from "@share/ui/Image"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import type { FC } from "react"

interface IPreviewTourImagesProps {
	photos: string[]
	alt?: string
}

export const PreviewTourImages: FC<IPreviewTourImagesProps> = ({ photos = [], alt }) => {
	const t = useTranslations("pages.detailTour.previewTour")

	if (!photos?.length) {
		return (
			<div className='h-[50vh] w-full'>
				<Typography
					variant='h4'
					textWidth='bold'
					as='p'
					color='danger'
				>
					{t("photoNotAdded")}
				</Typography>
			</div>
		)
	}

	return photos.length > 1 ? (
		<Carousel
			opts={{
				active: true,
				loop: true,
				align: "center",
			}}
		>
			<CarouselContent>
				{photos.map((photo) => (
					<CarouselItem key={photo}>
						<Image
							alt={t("photoAlt")}
							src={photo}
							priority
							width={300}
							height={300}
							className='h-[50vh] w-full object-cover'
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselLengthViewer />
		</Carousel>
	) : (
		<Image
			alt={alt || t("photoAlt")}
			src={photos[0]}
			width={300}
			height={300}
			className='h-[50vh] w-full object-cover'
		/>
	)
}
