"use server"

import { isAuthorized } from "@serverActions"

export const getUserAction = isAuthorized.createServerAction().handler(({ ctx: { user } }) => user)
