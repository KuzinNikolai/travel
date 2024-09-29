"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@share/ui/Form"
import { Input, Select, SelectContent, SelectTrigger, SelectValue } from "@share/ui/Inputs"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { type CreateTour, createTourFormSchema, useCreateTour } from "../lib/useCreateTour"

export const CreateTourForm = () => {
	const t = useTranslations()

	const createTourMutation = useCreateTour()

	const form = useForm<CreateTour>({
		mode: "onBlur",
		resolver: zodResolver(createTourFormSchema),
	})

	const onSubmit = form.handleSubmit((data) => {
		createTourMutation.mutateAsync(data)
	})

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
				<FormField
					name='category_id'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* {t("components.create-tour.fields.category")}</FormLabel>
							<FormControl>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder={t("components.create-tour.fields.not-select-category")} />
									</SelectTrigger>
									<SelectContent>
										{/* <SelectItem value='1'>1</SelectItem>
										<SelectItem value='2'>2</SelectItem>
										<SelectItem value='3'>3</SelectItem> */}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
