import { logger } from "@share/lib"
import { RedirectType, redirect } from "next/navigation"

/**
 * @description
 * Create a function that redirects back to a specific step by joining the base URL with the step names.
 * The base URL is expected to end with a slash.
 *
 * @param baseUrl - The base URL to which the step names will be appended.
 * @returns A function that when called, redirects to the specified step.
 */
export const createRedirectBack = (baseUrl: string) => {
	let url = baseUrl

	if (baseUrl[0] !== "/") {
		url = `/${url}`
	}
	if (baseUrl.at(-1) !== "/") {
		url += "/"
	}

	/**
	 * @description
	 * Redirects back to a specific step by joining the base URL with the step names.
	 *
	 * @param currentSteps - An array of step names to join with the base URL.
	 * The last step in the array is excluded.
	 */
	return (...currentSteps: (string | undefined | null)[]) => {
		// Filter out any undefined or null steps.
		const steps = currentSteps.filter((step) => !!step) as string[]
		// Remove the last step from the array.
		steps.pop()
		// Log the step that will be redirected to.
		logger.debug(`Redirect to step: ${steps}`)
		// Redirect to the specified step.
		redirect(url + steps.join("/"), RedirectType.replace)
	}
}
