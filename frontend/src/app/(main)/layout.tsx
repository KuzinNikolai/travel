import { Header } from "@/components/Header";
import { siteConfig } from "@/configs/siteConfig";
import "@assets/globals.css";
import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

const font = Inter({ axes: ["slnt"], subsets: ['cyrillic'] });

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
