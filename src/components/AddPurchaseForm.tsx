"use client"
import { useState } from "react"
import { Item } from "@prisma/client"
import { useRouter } from "next/navigation"

interface AddPurchaseFormProps {
  userId: string
  items: Item[]
}

export default function AddPurchaseForm({ userId, items }: AddPurchaseFormProps) {
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [customName, setCustomName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const amount = selectedItem ? selectedItem.price : parseInt(customAmount, 10)
      const itemName = selectedItem ? selectedItem.name : customName

      if (!itemName || isNaN(amount) || amount <= 0) {
        setError("請輸入有效的商品名稱與金額")
        return
      }

      const res = await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          itemId: selectedItem?.id,
          itemName,
          amount,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "新增失敗")
        return
      }

      router.refresh()
      setSelectedItem(null)
      setCustomAmount("")
      setCustomName("")
    } catch (err) {
      console.error("Purchase submission error:", err)
      setError("發生錯誤，請重試")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 space-y-4">
      <h2 className="text-yellow-400 font-bold text-lg">➕ 新增消費記錄</h2>

      <div className="space-y-2">
        <label className="text-gray-400 text-sm">選擇商品</label>
        <div className="grid grid-cols-2 gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              className={`p-3 rounded-lg text-left transition-colors ${
                selectedItem?.id === item.id
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs opacity-70">NT${item.price.toLocaleString()}</p>
            </button>
          ))}
        </div>
      </div>

      {!selectedItem && (
        <div className="space-y-2">
          <label className="text-gray-400 text-sm">或自訂消費</label>
          <input
            type="text"
            placeholder="商品名稱"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="number"
            placeholder="金額 (NT$)"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            min={1}
            className="w-full bg-gray-700 text-white rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 text-gray-900 font-bold rounded-lg transition-colors"
      >
        {loading ? "處理中..." : "確認新增"}
      </button>
    </form>
  )
}
