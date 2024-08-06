import type { NextRequest, NextResponse } from "next/server"

export type MiddlewareModuleFunc = (req: NextRequest) => NextResponse<unknown>

export type MiddlewareCheckerFunc = (req: NextRequest, func: MiddlewareModuleFunc) => boolean
