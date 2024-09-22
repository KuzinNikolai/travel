"use server"

import { isAuthorized } from "@share/packages/auth"

export const getUserAction = isAuthorized.createServerAction().handler(({ ctx: { user } }) => user)
