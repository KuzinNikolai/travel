import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from '../page.module.css'
import Head from "next/head";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Экскурсии по миру",
  description: "Бронирование экскурсий по всему миру",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={inter.className}>
        <nav className={styles.nav}>
          <ul>
            <li>Home</li>
            <li>Contacts</li>
            <li>Tours</li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
