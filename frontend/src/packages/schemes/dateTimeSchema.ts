import { DateTime } from "@/packages/utilsTypes/time";
import { z } from "zod";

export const dateTimeSchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/i
  ) satisfies z.ZodType<DateTime>;
