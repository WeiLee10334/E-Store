import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SignInButton from "@/components/SignInButton"

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect("/member/dashboard")

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-8">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-yellow-400">⚔️ 會員登入</h1>
        <p className="text-gray-400">使用 Google 帳號加入冒險者公會</p>
        <SignInButton />
      </div>
    </main>
  )
}
