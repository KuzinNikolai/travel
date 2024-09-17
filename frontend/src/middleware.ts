import { middleware } from "@app/middleware"

export default middleware.middlewareFc
export const config = {
	matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
