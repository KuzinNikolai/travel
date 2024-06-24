import { createConsola } from "consola";

export const logger = createConsola({
  level: process.env.NODE_ENV === "development" ? 5 : 3,
});
