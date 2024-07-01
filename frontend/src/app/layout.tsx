import { siteConfig } from "@/configs/siteConfig"
import { cn } from "@/packages/tw-utils"
import { Toaster } from "@/widgets/Toaster"
import "@assets/globals.css"
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
				{children}
				<Toaster />
			</body>
		</html>
	)
}

export default RootLayout
