"use client"

import { useGetSupplierTour } from "@entity/tour"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@share/ui/Form"
import { Input, Select, SelectContent, SelectTrigger, SelectValue } from "@share/ui/Inputs"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { serialize } from "object-to-formdata"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { type EditTour, editTourFormSchema, useEditTour } from "../lib/useEditTour"

export const CreateTourForm = () => {
	const t = useTranslations()

	const { tourId } = useParams()

	const tourIdNumber = Number.parseInt(Array.isArray(tourId) ? tourId[0] : tourId)

	const { offer } = useGetSupplierTour(Number.isNaN(tourIdNumber) ? 0 : tourIdNumber)

	const createTourMutation = useEditTour()

	const form = useForm<EditTour>({
		mode: "onBlur",
		resolver: zodResolver(editTourFormSchema),
	})

	const onSubmit = form.handleSubmit((data) => {
		const formData = serialize(data, {
			booleansAsIntegers: true,
			indices: true,
			allowEmptyArrays: true,
			dotsForObjectNotation: true,
			noAttributesWithArrayNotation: true,
			noFilesWithArrayNotation: true,
		})

		createTourMutation.mutateAsync(formData)
	})

	useEffect(() => {
		if (!offer) {
			return
		}

		const _offer: Partial<EditTour> = {
			description: offer.description,
			title: offer.title,
			faqs: offer.faqs,
			tags: offer.tags,
			lang: offer.lang,
			included: offer.included,
			notincluded: offer.notincluded,
			take: offer.take,
			transfer: offer.transfer,
		}

		form.reset(_offer)
	}, [offer, form])

	return (
		<Form {...form}>
			<form onSubmit={onSubmit}>
				<FormField
					name='title'
					rules={{ required: true }}
					render={({ field }) => (
						<FormItem>
							<FormLabel>* {t("components.create-tour.fields.create-tour")}</FormLabel>
							<FormControl>
								<Input
									{...field}
									type='text'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
