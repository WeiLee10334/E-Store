import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { createItemSchema } from "@/lib/validations"
import { z } from "zod"

export async function GET() {
  const items = await prisma.item.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  })
  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const data = createItemSchema.parse(body)

    const item = await prisma.item.create({ data })
    return NextResponse.json({ item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
