import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { MEMBER_LEVEL_CONFIG } from "@/lib/member"
import AddPurchaseForm from "@/components/AddPurchaseForm"

interface PageProps {
  params: Promise<{ userId: string }>
}

export default async function StoreScanPage({ params }: PageProps) {
  const { userId } = await params
  const session = await auth()
  if (!session) redirect("/store/login")

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      purchases: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  })

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <div className="text-red-400 text-xl">找不到此會員</div>
      </main>
    )
  }

  const items = await prisma.item.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  })

  const levelConfig = MEMBER_LEVEL_CONFIG[user.level]

  return (
    <main className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-yellow-400 text-center">
          🏪 會員資料
        </h1>
        <div className="bg-gray-800 rounded-xl p-6 space-y-3">
          <p className="text-white font-semibold text-lg">{user.name}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{levelConfig.emoji}</span>
            <span className="text-yellow-400 font-bold">{levelConfig.label}</span>
            <span className="text-gray-500 text-sm">({levelConfig.card})</span>
          </div>
          <p className="text-gray-300">總消費：NT${user.totalSpent.toLocaleString()}</p>
        </div>
        <AddPurchaseForm userId={user.id} items={items} />
      </div>
    </main>
  )
}
