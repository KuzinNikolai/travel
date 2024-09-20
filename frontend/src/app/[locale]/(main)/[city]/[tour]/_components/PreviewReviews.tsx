"use client"

import { ReviewItem, useReviews } from "@entity/review"
import type { DetailTour } from "@entity/tour"
import { Button } from "@share/ui/Buttons"
import { Section } from "@share/ui/Layout"
import { List } from "@share/ui/List"
import { Typography } from "@share/ui/Text"
import { WriteReviewForm } from "@widget/Reviews/WriteReviewForm"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type FC, useMemo } from "react"

interface PreviewReviewsProps {
	tour: Pick<DetailTour, "id" | "title" | "reviews">
}

export const PreviewReviews: FC<PreviewReviewsProps> = ({ tour }) => {
	const t = useTranslations("pages.detailTour.reviews")
	const lang = useLocale()

	const pathname = usePathname()
	const { data: allReviews, isPaused: pendingAllReviews } = useReviews(tour.id)

	const previewReviews = useMemo(() => {
		if (!allReviews) return []
		return allReviews.toSorted((current, next) => (current.created_date > next.created_date ? -1 : 0)).slice(0, 3)
	}, [allReviews])

	return (
		<Section
			title={t("title")}
			header={
				!pendingAllReviews && (allReviews?.length || 0) > 3 ? (
					<Button
						variant='ghost'
						asChild
					>
						<Link href={`${pathname}/reviews`}>смотреть все отзывы</Link>
					</Button>
				) : (
					<WriteReviewForm tourId={tour.id} />
				)
			}
		>
			<List orientation='vertical'>
				{previewReviews.length > 0 ? (
					previewReviews.map((review) => (
						<ReviewItem
							key={review.id}
							review={{
								...review,
								text: (review.translations[lang] || review).text,
							}}
						/>
					))
				) : (
					<Typography>{t("emptyReviews")}</Typography>
				)}
			</List>
		</Section>
	)
}
