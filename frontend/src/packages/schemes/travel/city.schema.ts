import { ICity, IDetailCity, ICityItem } from "@entities/travel/City.entity";
import { z } from "zod";
import { tourSchema } from "./tour.schema";

export const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  slug: z.string(),
  meta_desc: z.string(),
  description: z.string(),
  photo: z.string(),
}) satisfies z.ZodType<ICity>;

export const cityItemSchema = z.object({
  ...citySchema.shape,

  photo_alt: z.string(),
  tour_count: z.number(),
  popular_tours: z.array(tourSchema),
}) satisfies z.ZodType<ICityItem>;

export const detailCitySchema = z.object({
  ...citySchema.shape,

  tour_count: z.number(),
  tours: z.array(tourSchema),
}) satisfies z.ZodType<IDetailCity>;
