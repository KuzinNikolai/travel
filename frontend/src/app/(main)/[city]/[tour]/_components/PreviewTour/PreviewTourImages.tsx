"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselLengthViewer } from "@/components/@ui/carousel"
import { Typography } from "@/components/Typography"
import Image from "next/image"
import type { FC } from "react"

interface IPreviewTourImagesProps {
	photos: string[]
	alt?: string
}

export const PreviewTourImages: FC<IPreviewTourImagesProps> = ({ photos = [], alt }) => {
	if (!photos?.length) {
		return (
			<div className='h-[50vh] w-full'>
				<Typography
					variant='h4'
					textWidth='bold'
					as='p'
					color='danger'
				>
					Изображение не добавлено
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
							alt='Фотография к экскурсии'
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
			alt={alt || "Фотография к экскурсии"}
			src={photos[0]}
			width={300}
			height={300}
		/>
	)
}
