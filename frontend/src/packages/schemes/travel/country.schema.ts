import { z } from "zod";
import { citySchema } from "./city.schema";

export const countrySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  cities: z.array(citySchema),
})

export type ICountry = z.infer<typeof countrySchema>;

export const detailCountrySchema = z.object({
  ...countrySchema.shape,
})

export type IDetailCity = z.infer<typeof detailCountrySchema>;
