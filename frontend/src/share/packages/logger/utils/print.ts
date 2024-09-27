import { createConsola } from "consola"

/**
 * @description
 * This cross-platform logger for development and production build.
 *
 * Work on Client and Server side.
 */
export const print = createConsola({
	level: process.env.NODE_ENV === "development" ? 5 : 3,
})
