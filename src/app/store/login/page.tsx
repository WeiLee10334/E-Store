import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SignInButton from "@/components/SignInButton"

export default async function StoreLoginPage() {
  const session = await auth()
  if (session) redirect("/store/dashboard")

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="bg-gray-800 border border-yellow-900 rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-yellow-400">🏪 店家登入</h1>
        <p className="text-gray-400">使用 Google 帳號登入店家後台</p>
        <SignInButton />
      </div>
    </main>
  )
}
