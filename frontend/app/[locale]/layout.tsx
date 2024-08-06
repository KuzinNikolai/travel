import { inter } from "@assets/fonts"
import "@assets/globals.css"
import { Provider as ReactQueryClientV2Provider } from "@serverActions"
import { siteConfig } from "@app/configs/siteConfig"
import { cn } from "@share/lib"
import { Toaster } from "@share/ui/Popups"
import type { Metadata } from "next"
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

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang='en'>
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
				/>
			</head>
			<body className={cn(inter.className, "flex min-h-dvh flex-col")}>
				<ReactQueryClientV2Provider>
					{children}
					<Toaster />
				</ReactQueryClientV2Provider>
			</body>
		</html>
	)
}

export default RootLayout
