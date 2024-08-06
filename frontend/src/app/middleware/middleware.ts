import type { NextRequest, NextResponse } from "next/server"
import { i18nModule } from "./modules/i18n"

export async function middlewareFc(req: NextRequest): Promise<NextResponse<unknown> | undefined> {
	return i18nModule.middlewareFunc(req)
}
