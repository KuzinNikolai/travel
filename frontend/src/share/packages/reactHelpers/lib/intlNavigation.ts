import { i18nConfig } from "@share/i18n"
import { createLocalizedPathnamesNavigation } from "next-intl/navigation"

export const { Link, getPathname, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation(i18nConfig)
