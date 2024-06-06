import { arrToursSchema } from "@/packages/schemes/tours";
import { serverApi } from "../serverApi";

export const getTours = async () =>
  await serverApi("/tours", "GET", {
    schema: arrToursSchema,
  });
