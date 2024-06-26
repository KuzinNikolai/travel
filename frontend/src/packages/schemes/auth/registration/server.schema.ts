import { z } from "zod";
import { passwordScheme } from "../../password.schema";

export const registrationRequestSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: passwordScheme,

  first_name: z.string().min(1),
  last_name: z.string().min(1),
  age: z.number().min(16).max(90),
});
export type RegistrationRequest = z.infer<typeof registrationRequestSchema>;

export const registrationSuccessResponseSchema = registrationRequestSchema.omit({
  password: true,
});
export type RegistrationSuccessResponse = z.infer<typeof registrationSuccessResponseSchema>;

export const registrationErrorResponseSCheme = z.object({
  // FIX: nullable or optional
  username: z.string().array().nullable().optional(),
  email: z.string().array().nullable().optional(),
});
export type RegistrationErrorResponse = z.infer<typeof registrationErrorResponseSCheme>;
