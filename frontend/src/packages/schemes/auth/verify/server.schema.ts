import { z } from "zod";
import zu from "zod_utilz";

export const verificationCode = z.string().min(6).max(6);

export const verificationServerRequestSchema = z.object({
  email_verification_code: verificationCode,
});
export type VerificationServerRequest = z.infer<typeof verificationServerRequestSchema>;

export const verificationServerResponseSchema = z
  .object({ message: z.string() })
  .or(z.object({ error: z.string() }))
  .readonly();
export type VerificationServerResponse = z.infer<typeof verificationServerResponseSchema>;
