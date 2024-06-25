import { z } from "zod";

export const loginRequestScheme = z.object({
  email: z.string(),
  password: z.string(),
});
export type LoginRequest = z.infer<typeof loginRequestScheme>;

export const loginResponseScheme = z.object({
  auth_token: z.string(),
});
export type LoginResponse = z.infer<typeof loginResponseScheme>;
