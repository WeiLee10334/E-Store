import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { MEMBER_LEVEL_CONFIG } from "@/lib/member"
import { generateQRCode } from "@/lib/qrcode"
import MemberCard from "@/components/MemberCard"
import PurchaseHistory from "@/components/PurchaseHistory"

export default async function MemberDashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      purchases: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  })

  if (!user) redirect("/login")

  const qrCodeDataUrl = await generateQRCode(user.id)
  const levelConfig = MEMBER_LEVEL_CONFIG[user.level]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-yellow-400 text-center">
          ⚔️ 我的冒險日誌
        </h1>
        <MemberCard user={user} levelConfig={levelConfig} qrCodeDataUrl={qrCodeDataUrl} />
        <PurchaseHistory purchases={user.purchases} />
      </div>
    </main>
  )
}
