import { useGetCity } from "@entity/city"
import { useUserTokenStore, type User } from "@entity/user"
import { editUserSchema, useEditUser, type EditUser } from "@feature/editUser"
import { zodResolver } from "@hookform/resolvers/zod"
import { UploadAvatar } from "@share/ui/Avatar"
import { Button } from "@share/ui/Buttons"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { Input, Textarea } from "@share/ui/Inputs"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { useEffect, type FC } from "react"
import { useForm } from "react-hook-form"
import { UserInfoItem } from "./UserInfoItem"

interface UserEditFormProps {
	user: User
}

export const UserEditForm: FC<UserEditFormProps> = ({ user }) => {
	const { query, fetchRun } = useGetCity()

	const { getToken } = useUserTokenStore()
	const { mutate, isPending } = useEditUser()

	useEffect(() => {
		if (!user.city) return
		fetchRun(user.city)
	}, [user.city, fetchRun])

	const form = useForm<EditUser & { full_name: string }>({
		defaultValues: {
			first_name: user.first_name || "",
			last_name: user.last_name || "",
			full_name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
		},
		mode: "all",
		resolver: zodResolver(editUserSchema),
	})

	const onSubmit = form.handleSubmit((data) => {
		const formData = new FormData()

		for (const [key, value] of Object.entries(data)) {
			if (!value) {
				continue
			}

			if (value instanceof File) {
				formData.append(key, value)
				continue
			}

			formData.append(key, value)
		}

		const size = Array.from(formData.keys()).length

		const token = getToken()

		if (size > 0 && token) {
			mutate({ formData, token })
		}
	})

	return (
		<Section
			title='Настройка профиля'
			containerClassNames='h-full'
			hiddenTitle
		>
			<Form {...form}>
				<form onSubmit={onSubmit}>
					<div className='flex w-full flex-col items-center justify-center'>
						{user.is_staff && (
							<Typography
								variant='contentPrimary'
								as='p'
								className='mb-4'
							>
								Гид в {query.isLoading ? "загружается..." : query.data?.name}
							</Typography>
						)}
						<UploadAvatar
							{...form.register("photo")}
							value={form.getValues("photo") || user.photo || null}
							onChange={(file) => file && form.setValue("photo", file)}
							onBlur={() => form.trigger("photo")}
							name='photo'
							isPending={isPending}
							size={{ width: 90, height: 90 }}
						/>
						<UserInfoItem
							label='username'
							value={user.username}
						/>
						<UserInfoItem
							label='email'
							value={user.email}
						/>
					</div>
					<div className='mt-10 flex list-none flex-col gap-4'>
						{user.is_staff && (
							<FormField
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>О себе</FormLabel>
										<Textarea
											{...field}
											value={field.value || ""}
											className='resize-none'
											disabled={isPending}
										/>
										<FormMessage
											i18n={(message) =>
												message.includes("TO_BIG_DESCRIPTION_LENGTH")
													? `Максимальная длина описания ${message.match(/\d/gi)?.join("")} символов`
													: ""
											}
										/>
									</FormItem>
								)}
							/>
						)}

						<FormField
							name='full_name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Полное имя</FormLabel>
									<Input
										{...field}
										disabled={isPending}
										onChange={(e) => {
											const [firstName, lastName] = e.target.value.split(" ").slice(0, 2)
											form.setValue("full_name", e.target.value.split(" ").slice(0, 2).join(" "))
											form.setValue("first_name", firstName)
											form.setValue("last_name", lastName)
										}}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						variant='primary'
						className='mt-10 w-full'
						type='submit'
						disabled={!form.formState.isValid || !form.formState.isDirty || isPending}
					>
						Сохранить
					</Button>
				</form>
			</Form>
		</Section>
	)
}
