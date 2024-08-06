import { i18nConfig } from "@app/i18n"
import { createLocalizedPathnamesNavigation } from "next-intl/navigation"

export const { Link, getPathname, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation(i18nConfig)
