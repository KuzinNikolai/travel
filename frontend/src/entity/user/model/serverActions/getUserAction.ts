"use server"

import { isAuthorizedAction } from "@share/packages/auth"

export const getUserAction = isAuthorizedAction.createServerAction().handler(({ ctx: { user } }) => user)
