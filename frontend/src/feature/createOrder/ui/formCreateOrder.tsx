"use client"

import { createOrderRequestSchema, type CreateOrderRequest } from "@api/orders/_schema/POST"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@share/ui/Buttons"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@share/ui/Form"
import { DatePicker, Input, InputPhone, Textarea } from "@share/ui/Inputs"
import { format } from "date-fns"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useCreateOrder } from "../model/useCreateOrder"
import { useOrderStore } from "../model/useOrderStore"

export const FormCreateOrder = () => {
	const orderStore = useOrderStore()
	const { createOrder, status } = useCreateOrder()
	const router = useRouter()
	const pathname = usePathname()

	const form = useForm<CreateOrderRequest>({
		defaultValues: {
			full_name: "",
			phone: "",

			hotel: "",
			room_number: "",

			tour: orderStore.tour?.id || 0,
			program: orderStore.program?.id || 0,

			quantity_adults: 1,
			quantity_children: 0,
			quantity_infant: 0,

			text: "",
			trip_date: "",
		},
		resolver: zodResolver(createOrderRequestSchema),
	})

	const onSubmit = (data: CreateOrderRequest) => {
		createOrder(Object.assign(data, { trip_date: format(data.trip_date || new Date(), "yyyy-MM-dd") }))
	}

	useEffect(() => {
		if (status === "success") {
			orderStore.reset()
		}
	}, [status])

	useEffect(() => {
		if (!orderStore.program || !orderStore.tour) {
			router.push(".")
		}
	}, [pathname, orderStore.program, orderStore.tour])

	useEffect(() => {
		form.setFocus("full_name")
	}, [])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-3'
			>
				<FormField
					name='full_name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Как к вам обращаться</FormLabel>
							<FormControl>
								<Input
									{...field}
									type='text'
									placeholder='ФИО (Фамилия Имя Отчество)'
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Номер телефона</FormLabel>
							<FormControl>
								<InputPhone
									{...field}
									type='tel'
									required
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
							<FormLabel>* Адрес отеля</FormLabel>
							<FormControl>
								<Input
									{...field}
									type='text'
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='room_number'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Номер комнаты</FormLabel>
							<FormControl>
								<Input
									{...field}
									type='text'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='quantity_adults'
					render={({ field }) => (
						<FormItem>
							<FormLabel>* Взрослых</FormLabel>
							<FormControl>
								<Input
									{...field}
									type='number'
									min={1}
									onChange={(e) => form.setValue("quantity_adults", Number.parseInt(e.target.value) || 0)}
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
									{...field}
									type='number'
									min={0}
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
									{...field}
									type='number'
									min={0}
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
							<div className='flex flex-1 flex-col gap-1'>
								<FormLabel>* Дата экскурсии</FormLabel>
								<FormMessage />
							</div>
							<FormControl>
								<DatePicker
									onSelect={field.onChange}
									defaultSelect={new Date()}
									trigger={
										<Button
											onClick={() => form.setFocus("trip_date")}
											className='m-0 rounded bg-gray-200 p-1'
											{...field}
										>
											{field.value ? format(field.value, "PPP") : "Укажите дату"}
										</Button>
									}
									disable={(date: Date) => date.getTime() <= Date.now()}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='comment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Комментарий к заказу</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder='Например, есть ли у вас кресла?'
									rows={6}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					variant='default'
					type='submit'
					disabled={status === 'loading'}
				>
					Отправить заказ
				</Button>
			</form>
		</Form>
	)
}
