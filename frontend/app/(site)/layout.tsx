import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from '../page.module.css'
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
