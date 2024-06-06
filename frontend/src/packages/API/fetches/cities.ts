import { arrCitesSchema } from "@/packages/schemes/cities";
import { serverApi } from "../serverApi";

export const getCities = async () => await serverApi("/cities", "GET", { schema: arrCitesSchema });
