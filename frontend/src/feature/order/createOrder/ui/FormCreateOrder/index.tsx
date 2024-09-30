"use client"

import { useUser } from "@entity/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@share/ui/Buttons"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { DatePicker, Input, InputPhone, Textarea } from "@share/ui/Inputs"
import { format } from "date-fns"
import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useCreateOrder } from "../../model/lib/hooks/useCreateOrder"
import { createOrderSchema, type CreateOrder } from "../../model/schemas/createOrder.schema"
import { useCreateOrderStore } from "../../model/store/createOrderStore"
import { TDate } from "@share/packages/TDate"

export const FormCreateOrder = () => {
	const { mutateAsync: createOrder, isPending } = useCreateOrder()

	const {
		isAuthorized,
		query: { data: user },
	} = useUser()
	const { programId, tourId } = useCreateOrderStore()

	const form = useForm<CreateOrder>({
		resolver: zodResolver(createOrderSchema),
		defaultValues: {
			full_name: "",
			email: user?.email || "",
			phone: user?.phone || "",
			user: user?.id,

			tour: tourId || undefined,
			program: programId || undefined,

			hotel: "",
			quantity_adults: 1,
			quantity_children: 0,
			quantity_infant: 0,
			room_number: "",
			text: "",
		},
	})

	const onSubmit = form.handleSubmit((data) => {
		createOrder(data)
	})

	useEffect(() => {
		if (!isAuthorized) redirect(".")
	}, [isAuthorized])

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className='space-y-4'
			>
				<FormField
					name='full_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ваше имя</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Номер телефона</FormLabel>
							<FormControl>
								<InputPhone
									{...field}
									placeholder={form.getValues("phone") || ""}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='hotel'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Адрес отеля</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='quantity_adults'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Взрослых</FormLabel>
							<FormControl>
								<Input
									type='number'
									{...field}
									onChange={(e) => form.setValue("quantity_adults", Number.parseInt(e.target.value) || 1)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='quantity_children'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Детей (3-12 лет)</FormLabel>
							<FormControl>
								<Input
									type='number'
									{...field}
									onChange={(e) => form.setValue("quantity_children", Number.parseInt(e.target.value) || 0)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='quantity_infant'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Детей (0-3 лет)</FormLabel>
							<FormControl>
								<Input
									type='number'
									{...field}
									onChange={(e) => form.setValue("quantity_infant", Number.parseInt(e.target.value) || 0)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='trip_date'
					render={({ field }) => (
						<FormItem className='flex items-center justify-between space-y-[0px]'>
							<FormLabel>Дата экскурсии</FormLabel>
							<FormControl>
								<DatePicker
									onSelect={(date?: Date) => field.onChange(date ? format(date, "yyyy MM dd") : field.onChange())}
									defaultSelect={TDate.addDays(TDate.getToday(), 2)}
									trigger={
										<Button
											onClick={() => form.setFocus("trip_date")}
											className='m-0 rounded bg-gray-200 p-1'
											{...field}
										>
											{field.value ? format(field.value, "PPP") : "Укажите дату"}
										</Button>
									}
									required
									disable={(date) => date.getTime() <= Date.now() && TDate.addDays(date, 2).getTime() <= Date.now()}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='text'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Комментарий к заказу</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					variant='primary'
					className='w-full'
					disabled={!form.formState.isValid || isPending}
				>
					Отправить заказ
				</Button>
			</form>
		</Form>
	)
}
