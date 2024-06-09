import { IInfoItem } from "@/entities/travel/InfoItem.entity";
import { z } from "zod";

export const infoItemSchema = z.object({
  id: z.number(),
  name: z.string(),
}) satisfies z.ZodType<IInfoItem>;
