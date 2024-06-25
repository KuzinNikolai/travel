import { serverLogin } from "@/packages/API/fetches/auth/server";
import { invalidLoginErrorSchema } from "@/packages/schemes/auth/login/server.schema";
import { BadStatusCodes, SuccessStatusCodes } from "@/packages/utils/api-utils";
import { logger } from "@/packages/utils/logger";
import { loginRequestScheme, loginResponseScheme } from "@packages/schemes/auth/login/client.schema";
import { NextRequest, NextResponse } from "next/server";
import zu from "zod_utilz";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    logger.info(body);

    const { success: reqSuccess, data: reqData, error: reqError } = loginRequestScheme.safeParse(body);

    if (!reqSuccess) {
      return NextResponse.json({ code: "INVALID_BODY", error: reqError }, { status: BadStatusCodes.BAD_REQUEST });
    }

    const loginResponse = await serverLogin(reqData);

    const loginText = await loginResponse.text();

    const { success, data, error } = zu
      .stringToJSON()
      .pipe(loginResponseScheme.or(invalidLoginErrorSchema))
      .safeParse(loginText);

    if (!success) {
      return NextResponse.json(
        { code: "INVALID_RESPONSE_BODY", error },
        { status: BadStatusCodes.INTERNAL_SERVER_ERROR },
      );
    }

    if ("non_field_errors" in data) {
      return NextResponse.json({ code: "INVALID_CREDENTIALS" }, { status: BadStatusCodes.BAD_REQUEST });
    }

    return NextResponse.json({ token: data.auth_token }, { status: SuccessStatusCodes.ACCEPTED });
  } catch (e) {
    logger.error(e);

    return NextResponse.json({ code: "SERVER_ERROR" }, { status: BadStatusCodes.INTERNAL_SERVER_ERROR });
  }
}
