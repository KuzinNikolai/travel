"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@share/ui/Buttons";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@share/ui/Form";
import { DatePicker, Input, InputPhone, Textarea } from "@share/ui/Inputs";
import { Section } from "@share/ui/Layout";
import { useToast } from "@share/ui/Popups";
import { HeaderWithBack } from "@widget/Headers/HeaderWithBack";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { paymentFormSchema } from "./formSchema";

export const OrderTour = () => {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof paymentFormSchema>>({
		resolver: zodResolver(paymentFormSchema),
		defaultValues: {
			name: "",
			tel: "",
			numberOfAdults: 0,
			numberOfChildren: 0,
			numberOfYoungerChildren: 0,
			comment: "",
			hotel: "",
		},
	});

	function onSubmit(values: z.infer<typeof paymentFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		toast({
			title: "submit",
			description: "TEST",
		});
	}

	return (
		<>
			<HeaderWithBack title="Заказ экскурсии" />
			<Section className="h-full">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							name="name"
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
							name="tel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Номер телефона</FormLabel>
									<FormControl>
										<InputPhone {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="hotel"
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
							name="numberOfAdults"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Взрослых</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) =>
												form.setValue(
													"numberOfAdults",
													Number.parseInt(e.target.value) || 0,
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="numberOfChildren"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Детей (3-12 лет)</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) =>
												form.setValue(
													"numberOfChildren",
													Number.parseInt(e.target.value) || 0,
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="numberOfYoungerChildren"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Детей (0-3 лет)</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) =>
												form.setValue(
													"numberOfYoungerChildren",
													Number.parseInt(e.target.value) || 0,
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="excursionDate"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between space-y-[0px]">
									<FormLabel>Дата экскурсии</FormLabel>
									<FormControl>
										<DatePicker
											onSelect={field.onChange}
											defaultSelect={new Date()}
											trigger={
												<Button
													onClick={() => form.setFocus("excursionDate")}
													className="m-0 rounded bg-gray-200 p-1"
													{...field}
												>
													{field.value
														? format(field.value, "PPP")
														: "Укажите дату"}
												</Button>
											}
											disable={(date: Date) => date.getTime() <= Date.now()}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="comment"
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
						<button type="submit">Отправить заказ</button>
					</form>
				</Form>
			</Section>
		</>
	);
};
