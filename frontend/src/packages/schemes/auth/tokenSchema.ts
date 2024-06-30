import { z } from "zod";

export const tokenRegex = /^Token [a-zA-Z0-9]{40}$/gi;
export const tokenSchema = z.string().regex(tokenRegex);
