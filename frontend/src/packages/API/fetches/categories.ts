import { categorySchema } from "@/packages/schemes/travel/category.schema";
import { fetchApi } from "../serverApi";

export const getCategories = async () =>
  await fetchApi("/tour/categories", "GET", {
    schema: categorySchema.array(),
    next: { revalidate: 600 },
  })