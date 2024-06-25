import { serverLogout } from "@/packages/API/fetches/auth/server";
import { SafeJson } from "@/packages/utils/SafeJson";
import { BadStatusCodes, SuccessStatusCodes } from "@/packages/utils/api-utils";
import { logger } from "@/packages/utils/logger";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization");

    if (!token) {
      return NextResponse.json({ code: "UNAUTHORIZED" }, { status: BadStatusCodes.FORBIDDEN });
    }

    const { success, data } = z.object({ token: z.string().regex(/^Token\ [a-zA-Z0-9-]+$/) }).safeParse({ token });

    if (!success) {
      return NextResponse.json({ code: "INVALID_TOKEN" }, { status: BadStatusCodes.FORBIDDEN });
    }

    const res = await serverLogout(data.token.trim());
    const logoutText = await res.text();

    if (logoutText.length > 0) {
      const { success, data, error } = z.object({ detail: z.string() }).safeParse(SafeJson.parse(logoutText));

      if (!success) {
        logger.error(error);
        return NextResponse.json(
          { code: "INVALID_RESPONSE_BODY", error, success: false },
          { status: BadStatusCodes.INTERNAL_SERVER_ERROR },
        );
      }

      return NextResponse.json(
        { success: false, code: "LOGOUT", error: data.detail },
        { status: BadStatusCodes.FORBIDDEN },
      );
    }

    return NextResponse.json({ success: true }, { status: SuccessStatusCodes.OK });
  } catch (e) {
    logger.error(e);
    return NextResponse.json({ code: "SERVER_ERROR" }, { status: BadStatusCodes.INTERNAL_SERVER_ERROR });
  }
}
