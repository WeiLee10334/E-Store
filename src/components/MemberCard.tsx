import Image from "next/image"
import { User, Purchase } from "@prisma/client"
import { MEMBER_LEVEL_CONFIG } from "@/lib/member"

interface MemberCardProps {
  user: User & { purchases: Purchase[] }
  levelConfig: typeof MEMBER_LEVEL_CONFIG[keyof typeof MEMBER_LEVEL_CONFIG]
  qrCodeDataUrl: string
}

export default function MemberCard({ user, levelConfig, qrCodeDataUrl }: MemberCardProps) {
  const nextLevelSpent = levelConfig.maxSpent === Infinity ? null : levelConfig.maxSpent + 1 - user.totalSpent

  return (
    <div className={`bg-gradient-to-br ${levelConfig.color} rounded-2xl p-6 shadow-xl`}>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{levelConfig.emoji}</span>
            <div>
              <p className="text-white font-bold text-xl">{user.name}</p>
              <p className="text-white/80 text-sm">{levelConfig.label} · {levelConfig.card}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-white/70 text-xs">總消費金額</p>
            <p className="text-white font-bold text-2xl">NT${user.totalSpent.toLocaleString()}</p>
          </div>
          {nextLevelSpent !== null && nextLevelSpent > 0 && (
            <p className="text-white/60 text-xs">
              再消費 NT${nextLevelSpent.toLocaleString()} 可升級
            </p>
          )}
        </div>
        <div className="bg-white rounded-lg p-2">
          <Image src={qrCodeDataUrl} alt="Member QR Code" width={100} height={100} />
        </div>
      </div>
    </div>
  )
}
