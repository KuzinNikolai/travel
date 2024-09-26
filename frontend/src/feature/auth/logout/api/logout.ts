import { API_DOMAIN } from "@share/constants/API_DOMAIN";
import { baseErrorResponseSchema, fetcher } from "@share/packages/fetcher";
import { print } from "@share/packages/logger";
import { safeApi } from "@share/packages/safeApi";

enum LogoutErrors {
	FORBIDDEN = "FORBIDDEN",
	INVALID_TOKEN = "INVALID_TOKEN",
	NOT_AUTHORIZED = "NOT_AUTHORIZED",
	PARSE_ERROR = "PARSE_ERROR",
	VALIDATION_RESPONSE_ERROR = "VALIDATION_RESPONSE_ERROR",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

const NOT_AUTHORIZED = /^Invalid token header. No credentials provided.$/gi;
const INVALID_TOKEN = /^Invalid token.$/gi;

export async function logout(
	token: string,
): Promise<LogoutErrors | { success: true }> {
	print.debug("[logoutAction]", token);

	const resp = await fetcher(`${API_DOMAIN}/api/v1/auth/token/logout`, {
		method: "POST",
		token,
	});

	if (!resp) {
		return LogoutErrors.INTERNAL_SERVER_ERROR;
	}

	const text = await resp.text();

	if (!resp.ok) {
		const json = safeApi.json.parse(text);

		if (!json) {
			print.fatal("[logoutAction]", text);
			return LogoutErrors.PARSE_ERROR;
		}

		const { success, data, error } =
			await baseErrorResponseSchema.safeParseAsync(json);

		if (!success) {
			print.fatal("[logoutActionErrorResponseParse]", error);
			return LogoutErrors.VALIDATION_RESPONSE_ERROR;
		}

		const isInvalidToken = INVALID_TOKEN.test(data.detail);
		if (isInvalidToken) {
			return LogoutErrors.INVALID_TOKEN;
		}

		const isNotAuthorized = NOT_AUTHORIZED.test(data.detail);
		if (isNotAuthorized) {
			return LogoutErrors.NOT_AUTHORIZED;
		}

		print.debug("[logoutActionForbidden]", data);
		return LogoutErrors.FORBIDDEN;
	}

	return { success: true };
}

logout.errors = LogoutErrors;
