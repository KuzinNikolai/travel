import "@assets/globals.css"
import { Provider as ReactQueryClientV2Provider } from "@serverActions"
import { siteConfig } from "@share/config/siteConfig"
import { cn } from "@share/lib"
import { Toaster } from "@share/ui/Popups"
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
				<ReactQueryClientV2Provider>
					{children}
					<Toaster />
				</ReactQueryClientV2Provider>
			</body>
		</html>
	)
}

export default RootLayout
