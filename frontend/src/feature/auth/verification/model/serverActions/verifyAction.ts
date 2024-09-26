"use server";

import { API_DOMAIN } from "@share/constants/API_DOMAIN";
import { fetcher } from "@share/packages/fetcher";
import { print } from "@share/packages/logger";
import { safe, safeApi } from "@share/packages/safeApi";
import { z } from "zod";
import { ZSAError, createServerAction } from "zsa";
import {
	type VerifyRequestServer,
	responseSchema,
	verifyRequestSchema,
} from "../schema";

export const verifyAction = createServerAction()
	.input(verifyRequestSchema)
	.output(z.void())
	.handler(async ({ input: code }) => {
		const resp = await fetcher(`${API_DOMAIN}/api/v1/verify-email/`, {
			method: "POST",
			body: safeApi.json.stringify({
				email_verification_code: code,
			} satisfies VerifyRequestServer),
		});

		if (!resp) {
			throw new ZSAError("INTERNAL_SERVER_ERROR");
		}

		const parseText = await safe(resp.text());

		if (!parseText.success) {
			print.fatal("[verifyAction - text parse]", parseText.error);
			throw new ZSAError("INTERNAL_SERVER_ERROR");
		}

		const json = safeApi.json.parse(parseText.data);

		if (!json) {
			print.error("[verificationAction - json]", parseText.data);
			throw new ZSAError("INTERNAL_SERVER_ERROR");
		}

		const { success, data, error } = await responseSchema.safeParseAsync(json);

		if (!success) {
			print.error("[verifyActionResponse - validation]", error);
			throw new ZSAError("FORBIDDEN");
		}

		if ("error" in data) {
			throw new ZSAError("INPUT_PARSE_ERROR");
		}

		return;
	});
