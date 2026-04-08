import { MemberLevel } from "@prisma/client"

export function getMemberLevel(totalSpent: number): MemberLevel {
  if (totalSpent >= 10000) return MemberLevel.MASTER
  if (totalSpent >= 5000) return MemberLevel.ELITE
  if (totalSpent >= 1000) return MemberLevel.ADVENTURER
  return MemberLevel.NOVICE
}

export const MEMBER_LEVEL_CONFIG = {
  [MemberLevel.NOVICE]: {
    label: "初心者",
    emoji: "🐣",
    card: "R",
    minSpent: 0,
    maxSpent: 999,
    color: "from-gray-400 to-gray-600",
  },
  [MemberLevel.ADVENTURER]: {
    label: "冒險者",
    emoji: "⚔️",
    card: "SR",
    minSpent: 1000,
    maxSpent: 4999,
    color: "from-blue-400 to-blue-600",
  },
  [MemberLevel.ELITE]: {
    label: "高級冒險者",
    emoji: "🛡️",
    card: "SSR",
    minSpent: 5000,
    maxSpent: 9999,
    color: "from-purple-400 to-purple-600",
  },
  [MemberLevel.MASTER]: {
    label: "尊者",
    emoji: "👑",
    card: "UR",
    minSpent: 10000,
    maxSpent: Infinity,
    color: "from-yellow-400 to-yellow-600",
  },
}

export async function updateMemberLevel(userId: string, newTotalSpent: number) {
  const { prisma } = await import("@/lib/prisma")
  const level = getMemberLevel(newTotalSpent)
  await prisma.user.update({
    where: { id: userId },
    data: { level, totalSpent: newTotalSpent },
  })
}
