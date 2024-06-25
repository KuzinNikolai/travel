import { serverVerify } from "@/packages/API/fetches/auth/server";
import { verificationRequestSchema } from "@/packages/schemes/auth/verify/client.schema";
import { verificationServerResponseSchema } from "@/packages/schemes/auth/verify/server.schema";
import { BadStatusCodes, SuccessStatusCodes } from "@/packages/utils/api-utils";
import { logger } from "@/packages/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { success: reqSuccess, data: reqData, error: reqError } = verificationRequestSchema.safeParse(body);

    if (!reqSuccess) {
      return NextResponse.json(
        { code: "INVALID_BODY", error: reqError, success: false },
        { status: BadStatusCodes.BAD_REQUEST },
      );
    }

    const verificationResponse = await serverVerify({ email_verification_code: reqData.code });
    const json = await verificationResponse.json();

    const { success, data, error } = verificationServerResponseSchema.safeParse(json);

    if (!success) {
      logger.error(error);
      return NextResponse.json(
        { code: "INVALID_RESPONSE_BODY", error, success: false },
        { status: BadStatusCodes.INTERNAL_SERVER_ERROR },
      );
    }

    if ("error" in data) {
      return NextResponse.json(
        { code: "FORBIDDEN", error: data.error, success: false },
        { status: BadStatusCodes.FORBIDDEN },
      );
    }

    return NextResponse.json({ success: true }, { status: SuccessStatusCodes.OK });
  } catch (e) {
    logger.error(e);
    return NextResponse.json(
      { code: "SERVER_ERROR", success: false },
      { status: BadStatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
