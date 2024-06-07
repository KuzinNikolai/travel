import { detailCitySchema, cityItemSchema } from "@/packages/schemes/travel/city.schema";
import { fetchApi } from "../serverApi";
import { z } from "zod";

export const getCities = async () =>
  await fetchApi("/cities", "GET", { schema: z.array(cityItemSchema) });

export const getCity = async (citySlug: string) =>
  (await getCities())?.filter((item) => item.slug === citySlug)?.[0];

export const getCityDetail = async (citySlug: string) =>
  await fetchApi(`/cities/${citySlug}`, "GET", { schema: detailCitySchema });
