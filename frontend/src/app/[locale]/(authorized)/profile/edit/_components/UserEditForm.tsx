import { useGetCity } from "@entity/city"
import { editUserSchema, useEditUser, type EditUser } from "@feature/editUser"
import { zodResolver } from "@hookform/resolvers/zod"
import type { User } from "@share/schemas"
import { UploadAvatar } from "@share/ui/Avatar"
import { Button } from "@share/ui/Buttons"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { Input, Textarea } from "@share/ui/Inputs"
import { Section } from "@share/ui/Layout"
import { Typography } from "@share/ui/Text"
import { useTranslations } from "next-intl"
import { useEffect, type FC } from "react"
import { useForm } from "react-hook-form"
import { UserInfoItem } from "./UserInfoItem"

interface UserEditFormProps {
	user: User
}

export const UserEditForm: FC<UserEditFormProps> = ({ user }) => {
	const t = useTranslations("pages.profile")

	const { query, fetchRun } = useGetCity()

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

		if (size > 0) {
			mutate({ formData })
		}
	})

	return (
		<Section
			title={t("type.editProfile")}
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
								{t("userInfo.guideIn", { country: query.data?.country })}
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
							label={t("userInfo.userName")}
							value={user.username}
						/>
						<UserInfoItem
							label={t("userInfo.email")}
							value={user.email}
						/>
					</div>
					<div className='mt-10 flex list-none flex-col gap-4'>
						{user.is_staff && (
							<FormField
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("fields.aboutMe.title")}</FormLabel>
										<Textarea
											{...field}
											value={field.value || ""}
											className='resize-none'
											disabled={isPending}
										/>
										<FormMessage
											i18n={(message) =>
												message.includes("TO_BIG_DESCRIPTION_LENGTH")
													? t("fields.aboutMe.maxSize", { maxSize: message.match(/\d/gi)?.join("") })
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
									<FormLabel>{t("fields.fullName.title")}</FormLabel>
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
						{t("actions.save")}
					</Button>
				</form>
			</Form>
		</Section>
	)
}
