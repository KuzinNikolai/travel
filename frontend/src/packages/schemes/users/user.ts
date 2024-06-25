import { IUserData } from "@/entities/user.entity";
import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  surname: z.string(),
  patronymic: z.string(),
  avatar: z.string(),
});
export type UserData = z.infer<typeof userSchema>