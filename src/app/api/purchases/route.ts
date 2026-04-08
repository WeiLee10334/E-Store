import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { addPurchaseSchema } from "@/lib/validations"
import { getMemberLevel } from "@/lib/member"
import { z } from "zod"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const data = addPurchaseSchema.parse(body)

    const purchase = await prisma.$transaction(async (tx) => {
      const created = await tx.purchase.create({
        data: {
          userId: data.userId,
          itemId: data.itemId,
          itemName: data.itemName,
          amount: data.amount,
        },
      })

      const user = await tx.user.findUnique({
        where: { id: data.userId },
        select: { totalSpent: true },
      })

      const newTotalSpent = (user?.totalSpent ?? 0) + data.amount
      const newLevel = getMemberLevel(newTotalSpent)

      await tx.user.update({
        where: { id: data.userId },
        data: { totalSpent: newTotalSpent, level: newLevel },
      })

      return created
    })

    return NextResponse.json({ purchase }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error("Purchase error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
