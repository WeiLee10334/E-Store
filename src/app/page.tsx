import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const session = await auth()
  if (session) {
    redirect("/member/dashboard")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-5xl font-bold text-yellow-400 font-serif">
          ⚔️ 冒險者公會
        </h1>
        <p className="text-xl text-gray-300">
          Adventurer&apos;s Guild Membership System
        </p>
        <p className="text-gray-400">
          加入公會，追蹤您的冒險旅程，解鎖專屬徽章與特權
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/login"
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg transition-colors"
          >
            會員登入
          </Link>
          <Link
            href="/store/login"
            className="px-8 py-3 border border-gray-500 hover:border-gray-300 text-gray-300 rounded-lg transition-colors"
          >
            店家入口
          </Link>
        </div>
      </div>
    </main>
  )
}
