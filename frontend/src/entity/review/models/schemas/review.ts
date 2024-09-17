import { i18nConfig } from "@share/i18n";
import { dateTimeSchema } from "@share/constants/schemes/dateTime.schema";
import { z } from "zod";

export const reviewSchema = z.object({
	id: z.number(),
	rating: z.number(),
	user_full_name: z.string(),
	user: z.number(),
	user_photo: z.string().nullable(),
	tour: z.number(),
	text: z.string().nullable().optional(),
	created_date: dateTimeSchema,
	translations: z.record(
		z.enum(i18nConfig.locales),
		z.object({
			text: z.string(),
		}),
	),
});

export type Review = z.infer<typeof reviewSchema>;
