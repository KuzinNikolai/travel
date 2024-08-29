import { z } from "zod"

export const paymentFormSchema = z.object({
	name: z.string().min(1, "Это поле обязательно к заполнению"),
	tel: z.string().min(1, "Это поле обязательно к заполнению"),
	hotel: z.string().min(1, "Это поле обязательно к заполнению"),
	numberOfAdults: z.number().min(1, "Не может быть меньше 1"),
	numberOfChildren: z.number(),
	numberOfYoungerChildren: z.number(),
	excursionDate: z.date({ message: "Укажите дату" }),
	comment: z.string(),
})
