import { errorUserSchema, userSchema } from "@packages/schemes/users/user.schema";
import { logger } from "@/packages/utils/logger";
import { getServerCurrentUser } from "@packages/API/fetches/user/server";
import { checkAuthorization } from "@packages/API/utils/checkAuthorization";
import { BadStatusCodes, SuccessStatusCodes } from "@packages/utils/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    const authorized = await checkAuthorization(req);
  
    if (!authorized.success) {
      return authorized.errorResponse;
    }

    const currentUser = await getServerCurrentUser(authorized.token);
  
    const currentUserJson = await currentUser.json();
  
    const { success, data, error } = userSchema.or(errorUserSchema).safeParse(currentUserJson);

    if (!success) {
      logger.error(error);
      return NextResponse.json(
        { code: "INVALID_RESPONSE_BODY", error, success: false },
        { status: BadStatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
    
    if ("detail" in data) {
      return NextResponse.json({ code: "INVALID_TOKEN" }, { status: BadStatusCodes.FORBIDDEN });
    }
  
    return NextResponse.json(data, { status: SuccessStatusCodes.OK });
  } catch (error) {
    logger.error("Get User Critical Error:", error);
    return NextResponse.json({ code: "INTERNAL_SERVER_ERROR" }, { status: BadStatusCodes.INTERNAL_SERVER_ERROR });
  }
}
