import { IProgram } from "@/entities/travel/program.entity";
import { z } from "zod";

export const programSchema = z.object({
  title: z.string(),
  duration: z.string(),
  description: z.string(),
  adult_price: z.number(),
  child_price: z.number(),
}) satisfies z.ZodType<IProgram>;
