import { IUserData } from '@entities/user';
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  surname: z.string(),
  patronymic: z.string()
}) satisfies z.ZodType<IUserData>