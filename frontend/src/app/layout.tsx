import "@assets/globals.css"
import { ReactQueryClientProvider } from "@share/api"
import { siteConfig } from "@share/config"
import { cn } from "@share/lib"
import { Toaster } from "@share/ui"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type { FC, PropsWithChildren } from "react"

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
	},
}

const font = Inter({ axes: ["slnt"], subsets: ["cyrillic"] })

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang='en'>
			<body className={cn(font.className, "flex min-h-dvh flex-col")}>
				<ReactQueryClientProvider>{children}</ReactQueryClientProvider>
				<Toaster />
			</body>
		</html>
	)
}

export default RootLayout
