import { ICity, ICityItem } from "@/entities/travel";
import { z } from "zod";
import { tourSchema } from "./tours";

export const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  slug: z.string(),
  meta_desc: z.string(),
  description: z.string(),
  photo: z.string(),
}) satisfies z.ZodType<ICity>

export const cityItemSchema = z.object({
  tour_count: z.number(),
  popular_tours: z.array(tourSchema),
  ...citySchema.shape
}) satisfies z.ZodType<ICityItem>

export const arrCitesSchema = z.array(cityItemSchema) satisfies z.ZodType<ICityItem[]>
