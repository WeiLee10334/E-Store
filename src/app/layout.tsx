import type { Metadata } from "next"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"

export const metadata: Metadata = {
  title: "冒險者公會 | Adventurer's Guild",
  description: "冒險者公會會員系統 - 追蹤您的冒險旅程",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <html lang="zh-TW">
      <body className="font-sans">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
