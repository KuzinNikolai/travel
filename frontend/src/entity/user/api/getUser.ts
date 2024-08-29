"use server"

import { isAuthorized } from "@serverActions"

export const getUser = isAuthorized.createServerAction().handler(({ ctx: { user } }) => user)
