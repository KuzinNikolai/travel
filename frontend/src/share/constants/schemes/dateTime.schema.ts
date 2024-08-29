import { z } from "zod";

export const dateTimeSchema = z
	.string()
	.datetime()
	.or(z.date())
	.transform((val) => (val instanceof Date ? val : new Date(val)));

export const dateToDateTimeSchema = z
	.date()
	.transform((date) => date.toUTCString());
