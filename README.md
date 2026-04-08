# ⚔️ 冒險者公會會員系統 (Adventurer's Guild E-Store)

<div align="center">
  <p>
    <strong>A modern, anime-themed membership & loyalty management platform</strong>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15"/>
    <img src="https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma" alt="Prisma"/>
    <img src="https://img.shields.io/badge/Auth-NextAuth_v5-purple" alt="NextAuth v5"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8?logo=tailwindcss" alt="Tailwind"/>
    <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License"/>
  </p>
</div>

---

## 📖 專案概述 (Project Overview)

本系統是一套以**日系冒險者公會**為主題風格的會員管理平台。  
融合動漫卡牌美學，分為**會員端**與**店家端**，提供 QR Code 掃描、Google SSO 登入、消費記錄追蹤，以及等級徽章展示。

This project is an anime-styled membership management platform with an "Adventurer's Guild" theme. It features two portals — a **Member Portal** for end-users and a **Store Portal** for shop owners — with QR code scanning, Google SSO authentication, purchase tracking, and tiered member badges.

---

## 🗂️ 目錄 (Table of Contents)

- [功能特色 (Features)](#-功能特色-features)
- [技術架構 (Tech Stack)](#-技術架構-tech-stack)
- [會員等級制度 (Membership Tiers)](#-會員等級制度-membership-tiers)
- [系統架構圖 (Architecture)](#-系統架構圖-architecture)
- [快速開始 (Getting Started)](#-快速開始-getting-started)
- [環境變數 (Environment Variables)](#-環境變數-environment-variables)
- [資料庫設計 (Database Schema)](#-資料庫設計-database-schema)
- [API 文件 (API Reference)](#-api-文件-api-reference)
- [安全性設計 (Security)](#-安全性設計-security)
- [部署 (Deployment)](#-部署-deployment)
- [路由說明 (Routes)](#-路由說明-routes)
- [延伸功能 (Roadmap)](#-延伸功能-roadmap)

---

## ✨ 功能特色 (Features)

### 🧑‍💼 會員端 (Member Portal)
- **Google SSO 一鍵登入** — 無需額外註冊
- **動態會員卡** — 卡牌風格展示等級、徽章與 QR Code
- **冒險日誌** — 歷史消費紀錄一覽
- **自動升等** — 累積消費自動計算等級
- **個人 QR Code** — 嵌入會員卡，可供店家掃描

### 🏪 店家端 (Store Portal)
- **掃描 QR Code** — 快速查詢會員資訊
- **新增消費記錄** — 選擇商品或自訂金額
- **會員列表** — 排行依總消費排序
- **商品管理** — 商品新增、修改、上下架 (API 就緒)

---

## 🛠️ 技術架構 (Tech Stack)

| 類別 | 技術 | 版本 |
|------|------|------|
| Framework | [Next.js](https://nextjs.org/) App Router | 15.5.x |
| Language | TypeScript (strict mode) | 5.7.x |
| Auth | [NextAuth.js v5](https://authjs.dev/) + Google OAuth | 5.0.0-beta |
| ORM | [Prisma](https://www.prisma.io/) | 5.x |
| Database | PostgreSQL | 15+ |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | 3.x |
| Validation | [Zod](https://zod.dev/) | 3.x |
| QR Code | [qrcode](https://www.npmjs.com/package/qrcode) | 1.5.x |
| Deployment | [Vercel](https://vercel.com/) / [Railway](https://railway.app/) | — |

---

## 🏆 會員等級制度 (Membership Tiers)

| 等級 | 消費門檻 | 徽章 | 卡片稀有度 | 漸層顏色 |
|------|---------|------|-----------|---------|
| 初心者 (Novice) | NT$0 – $999 | 🐣 | R | 灰色系 |
| 冒險者 (Adventurer) | NT$1,000 – $4,999 | ⚔️ | SR | 藍色系 |
| 高級冒險者 (Elite) | NT$5,000 – $9,999 | 🛡️ | SSR | 紫色系 |
| 尊者 (Master) | NT$10,000+ | 👑 | UR | 金色系 |

等級由系統依據 `totalSpent`（總消費）自動計算並即時更新。

---

## 🏗️ 系統架構圖 (Architecture)

```
┌─────────────────────────────────────────────────────────┐
│                      Next.js 14 App                      │
│                                                          │
│  ┌──────────────┐      ┌───────────────────────────┐     │
│  │  Member      │      │     Store Portal           │     │
│  │  Portal      │      │   /store/login             │     │
│  │  /login      │      │   /store/dashboard         │     │
│  │  /member/    │      │   /store/scan/[userId]     │     │
│  │  dashboard   │      └───────────────────────────┘     │
│  └──────────────┘                                        │
│         │                        │                       │
│         └───────────┬────────────┘                       │
│                     ▼                                    │
│           ┌──────────────────┐                           │
│           │  NextAuth v5     │                           │
│           │  Google OAuth    │                           │
│           │  Session (DB)    │                           │
│           └──────────┬───────┘                           │
│                      │                                   │
│           ┌──────────▼───────┐                           │
│           │  API Routes      │                           │
│           │  /api/auth/[...] │                           │
│           │  /api/purchases  │                           │
│           │  /api/items      │                           │
│           └──────────┬───────┘                           │
│                      │                                   │
└──────────────────────┼──────────────────────────────────┘
                       │
           ┌───────────▼────────────┐
           │   Prisma ORM           │
           │   PostgreSQL 15+       │
           │   users / accounts /   │
           │   sessions / purchases │
           │   items                │
           └────────────────────────┘
```

### 🔄 使用者端流程 (Member Flow)
```
登入 (Google SSO)
    ↓
確認/建立會員資料
    ↓
顯示會員卡 (等級 + 徽章 + QR Code)
    ↓
查看冒險日誌 (消費記錄)
```

### 🔄 店家端流程 (Store Flow)
```
掃描 QR Code
    ↓
顯示會員資訊
    ↓
新增消費記錄 (商品 or 自訂金額)
    ↓
自動更新等級 + 寫入 DB
    ↓
會員端即時反映
```

---

## 🚀 快速開始 (Getting Started)

### 前置需求 (Prerequisites)
- [Node.js](https://nodejs.org/) 18.17+
- [PostgreSQL](https://www.postgresql.org/) 15+
- [Google Cloud Console](https://console.cloud.google.com/) OAuth 憑證

### 安裝步驟 (Installation)

```bash
# 1. Clone 專案
git clone https://github.com/WeiLee10334/E-Store.git
cd E-Store

# 2. 安裝依賴
npm install

# 3. 設定環境變數
cp .env.example .env
# 編輯 .env，填入真實的憑證 (見下方說明)

# 4. 初始化資料庫
npm run db:generate   # 生成 Prisma Client
npm run db:push       # 建立 DB Schema（開發用）
# 或正式環境使用：
# npm run db:migrate

# 5. 啟動開發伺服器
npm run dev
# 開啟 http://localhost:3000
```

---

## 🔑 環境變數 (Environment Variables)

複製 `.env.example` 為 `.env`，並填入以下值：

```env
# ── 資料庫 ──────────────────────────────────────────
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/estore"

# ── NextAuth ────────────────────────────────────────
# 使用 `openssl rand -base64 32` 生成安全金鑰
AUTH_SECRET="your-secret-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"   # 正式環境改為你的 domain

# ── Google OAuth ─────────────────────────────────────
# 前往 https://console.cloud.google.com/ → APIs & Services → Credentials
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxx"
```

> ⚠️ **安全提醒**：`.env` 已加入 `.gitignore`，請勿將真實憑證提交至版本控制。

---

## 📦 資料庫設計 (Database Schema)

### users
| 欄位 | 類型 | 說明 |
|------|------|------|
| id | String (CUID) | 主鍵 |
| googleId | String? | Google 帳號 ID |
| name | String? | 顯示名稱 |
| email | String? (unique) | Email |
| level | MemberLevel | 會員等級（自動計算） |
| totalSpent | Int | 累積消費總額 (NT$) |
| createdAt | DateTime | 建立時間 |
| updatedAt | DateTime | 最後更新時間 |

### purchases
| 欄位 | 類型 | 說明 |
|------|------|------|
| id | String (CUID) | 主鍵 |
| userId | String | 所屬會員 ID |
| itemId | String? | 商品 ID（可 null） |
| itemName | String | 商品名稱快照 |
| amount | Int | 消費金額 (NT$) |
| createdAt | DateTime | 消費時間 |

### items
| 欄位 | 類型 | 說明 |
|------|------|------|
| id | String (CUID) | 主鍵 |
| name | String | 商品名稱 |
| price | Int | 售價 (NT$) |
| isActive | Boolean | 是否上架 |
| createdAt | DateTime | 建立時間 |
| updatedAt | DateTime | 最後更新時間 |

### accounts / sessions / verification_tokens
NextAuth.js v5 標準 adapter 表格（由 `@auth/prisma-adapter` 管理）

---

## 📡 API 文件 (API Reference)

所有 API 路由需要有效的登入 Session。

### `POST /api/purchases`
新增消費記錄，並自動更新會員等級。

**Request Body (JSON)**
```json
{
  "userId": "cuid...",
  "itemId": "cuid... (optional)",
  "itemName": "商品名稱",
  "amount": 500
}
```

**Response (201)**
```json
{
  "purchase": { "id": "...", "userId": "...", "itemName": "...", "amount": 500, "createdAt": "..." }
}
```

---

### `GET /api/items`
取得所有上架商品列表。

**Response (200)**
```json
{
  "items": [{ "id": "...", "name": "...", "price": 299, "isActive": true }]
}
```

---

### `POST /api/items`
建立新商品（需要登入）。

**Request Body (JSON)**
```json
{
  "name": "魔法藥水",
  "price": 299
}
```

---

## 🔐 安全性設計 (Security)

| 機制 | 說明 |
|------|------|
| **NextAuth v5 Session** | 資料庫儲存 session，防止 JWT 竄改 |
| **Middleware 路由保護** | `/member/*` 與 `/store/*` 需要認證才可存取 |
| **Zod Input Validation** | 所有 API 輸入透過 Zod schema 嚴格驗證 |
| **DB Transaction** | 消費記錄與等級更新在同一事務中執行，確保資料一致性 |
| **Security Headers** | `X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy` |
| **環境變數隔離** | `.env` 加入 `.gitignore`，敏感資訊不進版本控制 |
| **TypeScript Strict Mode** | 編譯期型別安全，減少執行期錯誤 |
| **HTTPS only in production** | `trustHost: true` 配合 NEXTAUTH_URL 限制 origin |

---

## 🗺️ 路由說明 (Routes)

| 路由 | 類型 | 說明 | 需要登入 |
|------|------|------|---------|
| `/` | Page | 首頁（自動導向） | ❌ |
| `/login` | Page | 會員 Google 登入 | ❌ |
| `/member/dashboard` | Page | 會員儀表板 | ✅ |
| `/store/login` | Page | 店家 Google 登入 | ❌ |
| `/store/dashboard` | Page | 店家後台 - 會員列表 | ✅ |
| `/store/scan/[userId]` | Page | 掃描後查看會員 + 新增消費 | ✅ |
| `/api/auth/[...nextauth]` | API | NextAuth handler | — |
| `/api/purchases` | API | 新增消費記錄 | ✅ |
| `/api/items` | API | 商品查詢/新增 | ✅ |

---

## ☁️ 部署 (Deployment)

### Vercel + Railway (推薦)

1. **資料庫 (Railway)**
   - 建立 PostgreSQL 服務，取得 `DATABASE_URL`

2. **前端 (Vercel)**
   ```bash
   vercel --prod
   ```
   - 在 Vercel Dashboard 設定所有環境變數

3. **Google OAuth 設定**
   - 在 Google Cloud Console，將 `https://your-domain.vercel.app/api/auth/callback/google` 加入 Authorized redirect URIs

4. **首次部署後執行**
   ```bash
   npx prisma migrate deploy
   ```

---

## 🔮 延伸功能 (Roadmap)

- [ ] 🏪 店家角色權限管理（區分一般員工與管理員）
- [ ] 📱 LINE Login 整合（`@auth/line-provider`）
- [ ] 🎁 推薦邀請碼系統
- [ ] 🔔 LINE Notify 消費通知
- [ ] 🎮 每日簽到任務與冒險點數
- [ ] 🛒 等級解鎖專屬商城
- [ ] 📊 進階消費統計報表
- [ ] 🌐 多分店支援

---

## 📝 License

MIT © [WeiLee10334](https://github.com/WeiLee10334)
