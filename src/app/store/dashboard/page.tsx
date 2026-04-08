import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { MEMBER_LEVEL_CONFIG } from "@/lib/member"
import Link from "next/link"

export default async function StoreDashboardPage() {
  const session = await auth()
  if (!session) redirect("/store/login")

  const users = await prisma.user.findMany({
    orderBy: { totalSpent: "desc" },
    take: 50,
  })

  return (
    <main className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-yellow-400">🏪 店家後台</h1>
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-sm">
                <th className="p-4 text-left">會員</th>
                <th className="p-4 text-left">等級</th>
                <th className="p-4 text-right">總消費</th>
                <th className="p-4 text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const levelConfig = MEMBER_LEVEL_CONFIG[user.level]
                return (
                  <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-750">
                    <td className="p-4">
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1">
                        <span>{levelConfig.emoji}</span>
                        <span className="text-yellow-400 text-sm">{levelConfig.label}</span>
                      </span>
                    </td>
                    <td className="p-4 text-right text-green-400">
                      NT${user.totalSpent.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <Link
                        href={`/store/scan/${user.id}`}
                        className="text-xs bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-medium transition-colors"
                      >
                        新增消費
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
