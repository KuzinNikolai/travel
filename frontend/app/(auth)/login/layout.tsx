import type { Metadata } from "next";
import { Inter } from "next/font/google";


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
        <div>
          Авторизация
        </div>
        {children}
      </body>
    </html>
  )
}
