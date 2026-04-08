import { z } from "zod"

export const addPurchaseSchema = z.object({
  userId: z.string().cuid(),
  itemId: z.string().cuid().optional(),
  itemName: z.string().min(1).max(100),
  amount: z.number().int().positive().max(1000000),
})

export const createItemSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().int().positive().max(1000000),
})

export const updateItemSchema = createItemSchema.extend({
  isActive: z.boolean().optional(),
})
