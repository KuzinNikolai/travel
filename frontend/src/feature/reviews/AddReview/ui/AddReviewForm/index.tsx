"use client"

import type { Tour } from "@share/schemas"
import { useUser } from "@entity/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { __SERVER__ } from "@share/constants/environment"
import { Button } from "@share/ui/Buttons"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { Textarea } from "@share/ui/Inputs"
import { InputRating } from "@share/ui/Inputs/InputRating"
import { useAuthStore } from "@widget/Auth"
import { useLocale } from "next-intl"
import { type FC, type MouseEventHandler, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAddReview } from "../../model/lib/hooks/useAddReview"
import { type AddReviewData, addReviewDataSchema } from "../../model/schema"

interface AddReviewFormProps {
	tourId: Tour["id"]
	onSuccessAdd?: () => void
}

export const AddReviewForm: FC<AddReviewFormProps> = ({ tourId, onSuccessAdd }) => {
	const lang = useLocale()

	const {
		query: { data: user, isPending: isUserPending },
	} = useUser()

	const { mutateAsync: addReview, isPending: isAddReviewPending, isSuccess } = useAddReview(tourId)

	const authModal = useAuthStore()
	const form = useForm<AddReviewData>({
		mode: "all",
		defaultValues: {
			tour: tourId,
			user_full_name: "",
			rating: 1,
			text: "",
			created_date: new Date(),
			translations: {},
		},
		resolver: zodResolver(addReviewDataSchema),
	})

	useEffect(() => {
		if (!user) return
		form.setValue("user", user?.id)
		form.setValue("tour", tourId)
		form.setValue("user_full_name", user?.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : "")
		form.setValue("user_photo", user.photo), form.setValue("created_date", new Date())
	}, [form, user, tourId])

	const onSubmit = form.handleSubmit(async (data) => {
		if (__SERVER__) return

		addReview({
			...data,
			created_date: new Date(),
			translations: { [lang]: { text: data.text } },
		})
	})

	useEffect(() => {
		isSuccess && onSuccessAdd?.()
	}, [isSuccess, onSuccessAdd])

	const onSubmitClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		if (!user) {
			e.preventDefault()
			authModal.setExpand(true)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className='flex flex-col gap-sm'
			>
				<FormField
					name='rating'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='sr-only absolute'>* Оценка</FormLabel>
							<FormControl>
								<InputRating
									onChange={field.onChange}
									onBlur={field.onBlur}
									rating={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='text'
					render={() => (
						<FormItem>
							<FormLabel className='sr-only absolute'>Комментарий</FormLabel>
							<FormControl>
								<Textarea
									{...form.register("text")}
									className='max-h-40'
									placeholder='Комментарий'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					variant='primary'
					className='w-full'
					disabled={isUserPending || isAddReviewPending}
					onClick={onSubmitClick}
				>
					Оставить
				</Button>
			</form>
		</Form>
	)
}
