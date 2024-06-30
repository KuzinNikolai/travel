import { getServerCurrentUser } from "@/packages/API/fetches/user/server";
import { tokenSchema } from "@/packages/schemes/auth/tokenSchema";
import { BadStatusCodes } from "@/packages/utils/api-utils";
import { logger } from "@/packages/utils/logger";
import { NextRequest, NextResponse } from "next/server";

type CheckAuthorizationReturn = {
  success: boolean;
} & (
  | {
      success: true;
      token: string;
      tokenWithPrefix: string;
    }
  | {
      success: false;
      errorResponse: Response;
    }
);

export const checkAuthorization = async (req: NextRequest): Promise<CheckAuthorizationReturn> => {
  try {
    const headers = new Headers(req.headers);

    if (!headers.has("Authorization")) {
      logger.debug("Authorization header not found");
      return {
        success: false,
        errorResponse: NextResponse.json({ code: "UNAUTHORIZED" }, { status: BadStatusCodes.BAD_GATEWAY }),
      };
    }

    const headerToken = headers.get("Authorization");

    const { success: isTokenValid, data: token } = tokenSchema.safeParse(headerToken);

    if (!isTokenValid) {
      logger.debug("Invalid token format");
      return {
        success: false,
        errorResponse: NextResponse.json({ code: "INVALID_TOKEN" }, { status: BadStatusCodes.FORBIDDEN }),
      };
    }

    const [_, tokenValue] = token.split(" ");

    const users = await getServerCurrentUser(tokenValue);

    if (!users) {
      logger.debug("User not found");
      return {
        success: false,
        errorResponse: NextResponse.json(
          { code: "INTERNAL_SERVER_ERROR" },
          { status: BadStatusCodes.INTERNAL_SERVER_ERROR },
        ),
      };
    }

    if ("detail" in users) {
      logger.debug("Invalid token");
      return {
        success: false,
        errorResponse: NextResponse.json({ code: "INVALID_TOKEN" }, { status: BadStatusCodes.FORBIDDEN }),
      };
    }

    return {
      success: true,
      token: tokenValue,
      tokenWithPrefix: token,
    };
  } catch (error) {
    logger.error(error);
    return {
      success: false,
      errorResponse: NextResponse.json(
        { code: "INTERNAL_SERVER_ERROR" },
        { status: BadStatusCodes.INTERNAL_SERVER_ERROR },
      ),
    };
  }
};
