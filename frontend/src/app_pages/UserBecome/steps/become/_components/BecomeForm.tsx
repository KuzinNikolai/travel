"use client"

import { useGetCityList } from "@entity/city"
import { useGetCountryList } from "@entity/country"
import { useUserTokenStore } from "@entity/user"
import { type BecomeGuide, becomeGuideSchema, useBecomeGuide } from "@feature/becomeGuide"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@share/ui/Buttons"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { Icon } from "@share/ui/Icon"
import { InputPhone, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@share/ui/Inputs"
import { Typography } from "@share/ui/Text"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export const BecomeForm = () => {
	const { getToken } = useUserTokenStore()

	const form = useForm<BecomeGuide>({
		resolver: zodResolver(becomeGuideSchema),
	})

	const becomeGuide = useBecomeGuide()

	const countryListQuery = useGetCountryList()
	const cityListQuery = useGetCityList()

	const handleSubmit = form.handleSubmit((data) => {
		becomeGuide.mutate({ ...data, token: getToken() || "" })
	})

	useEffect(() => {
		if (!becomeGuide.isSuccess) return
		redirect("/profile")
	}, [becomeGuide.isSuccess])

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit}
				className='flex w-full flex-col gap-4'
			>
				<FormField
					name='country'
					render={({ field }) => (
						<FormItem className='w-full'>
							<Select
								name={field.name}
								value={field.value?.toString()}
								disabled={countryListQuery.isLoading || becomeGuide.isPending}
								onValueChange={(value) => field.onChange(Number.parseInt(value))}
							>
								<SelectTrigger className='w-full justify-between'>
									<FormLabel>* Страна</FormLabel>
									<div className='flex items-center gap-2'>
										<SelectValue placeholder='Select a fruit' />
										<Icon
											name='ChevronDown'
											className='h-4 w-4'
										/>
									</div>
								</SelectTrigger>
								<SelectContent ref={field.ref}>
									{countryListQuery.isLoading && <Typography>Загрузка стран...</Typography>}
									{countryListQuery.isFetched && !countryListQuery.data?.length && (
										<Typography>Не удалось загрузить страны</Typography>
									)}
									{countryListQuery.data?.length &&
										countryListQuery.data.map((country) => (
											<SelectItem
												key={country.id}
												value={country.id.toString()}
											>
												{country.name}
											</SelectItem>
										))}
								</SelectContent>
								<FormMessage />
							</Select>
						</FormItem>
					)}
				/>
				{form.getValues("country") && (
					<FormField
						name='city'
						render={({ field }) => (
							<FormItem className='w-full'>
								<Select
									name={field.name}
									value={field.value?.toString()}
									disabled={countryListQuery.isLoading || becomeGuide.isPending}
									onValueChange={(value) => field.onChange(Number.parseInt(value))}
								>
									<SelectTrigger className='w-full justify-between'>
										<FormLabel>* Город</FormLabel>
										<div className='flex items-center gap-2'>
											<SelectValue placeholder='Select a fruit' />
											<Icon
												name='ChevronDown'
												className='h-4 w-4'
											/>
										</div>
									</SelectTrigger>
									<SelectContent ref={field.ref}>
										{cityListQuery.isLoading && <Typography>Загрузка городов...</Typography>}
										{cityListQuery.isFetched && !cityListQuery.data?.length && (
											<Typography>Не удалось загрузить города</Typography>
										)}
										{cityListQuery.data?.length &&
											cityListQuery.data.map((city) => (
												<SelectItem
													key={city.id}
													value={city.id.toString()}
												>
													{city.name}
												</SelectItem>
											))}
									</SelectContent>
									<FormMessage />
								</Select>
							</FormItem>
						)}
					/>
				)}
				<FormField
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Номер телефона</FormLabel>
							<InputPhone {...field} />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					disabled={!form.formState.isValid || becomeGuide.isPending}
					className='w-full'
					variant='primary'
					size='lg'
				>
					Отправить
				</Button>
			</form>
		</Form>
	)
}
