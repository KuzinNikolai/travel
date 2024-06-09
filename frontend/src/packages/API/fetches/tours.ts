import { detailTourSchema, tourSchema } from "@/packages/schemes/travel/tour.schema";
import { fetchApi } from "../serverApi";
import { z } from "zod";

export const getTours = async () =>
  await fetchApi("/tours", "GET", { schema: z.array(tourSchema) });

export const getDetailTour = async (tourSlug: string) => 
  await fetchApi(`/tours/${tourSlug}`,"GET", { schema: detailTourSchema })