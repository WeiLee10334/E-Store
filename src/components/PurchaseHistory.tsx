import { Purchase } from "@prisma/client"

interface PurchaseHistoryProps {
  purchases: Purchase[]
}

export default function PurchaseHistory({ purchases }: PurchaseHistoryProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 space-y-4">
      <h2 className="text-yellow-400 font-bold text-lg">📜 冒險日誌</h2>
      {purchases.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">尚無消費記錄</p>
      ) : (
        <ul className="space-y-3">
          {purchases.map((purchase) => (
            <li key={purchase.id} className="flex justify-between items-center border-b border-gray-700 pb-3">
              <div>
                <p className="text-white font-medium">{purchase.itemName}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(purchase.createdAt).toLocaleDateString("zh-TW")}
                </p>
              </div>
              <p className="text-green-400 font-bold">NT${purchase.amount.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
