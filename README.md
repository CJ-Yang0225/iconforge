# IconForge

> 🚧 **Work In Progress** - 目前處於開發階段，API 可能會有變動

現代化的 SVG 圖標管理工具，專為 React/Next.js 設計，提供完整的型別安全與自動化工作流程。

## ✨ 特色功能

- 🎯 **型別安全**：自動生成 TypeScript 型別定義，享受完整的 IDE 自動補全
- ⚡ **自動化**：掃描、優化、生成一鍵完成
- 🎨 **顏色控制**：智能處理 `currentColor`，輕鬆實現主題切換
- 🔧 **高度可配置**：靈活的配置選項，適應各種使用場景
- 📦 **Monorepo 架構**：清晰的模組化設計
- 🚀 **SSR 友善**：支援 Next.js 等 SSR 框架，無 FOUC 問題

## 📦 套件說明

此專案採用 Monorepo 架構，包含以下套件：

- **[@iconforge/core](./packages/core)** - 核心處理邏輯（SVG 載入、優化、處理）
- **[@iconforge/cli](./packages/cli)** - 命令列工具
- **[@iconforge/react](./packages/react)** - React 執行環境輔助套件

## 🚀 快速開始

### 1. 安裝

```bash
# 使用 pnpm（推薦）
pnpm add -D @iconforge/cli @iconforge/react

# 或使用 npm
npm install -D @iconforge/cli @iconforge/react
```

### 2. 初始化專案

在專案根目錄執行初始化指令：

```bash
npx iconforge init
```

這將會：
- 建立 `iconforge.config.ts` 設定檔
- 建立 `src/assets/icons` 目錄 (範例圖標位置)
- 更新 `.gitignore`

### 3. 在 React/Next.js 中設定

**Step 1: 在根 Layout 注入 Symbols**

編輯 `src/app/layout.tsx` (Next.js App Router) 或 `src/main.tsx` (Vite)：

```tsx
import { SvgSymbols } from '@/generated/icons/react'; // 根據 output 設定調整路徑

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SvgSymbols />
        {children}
      </body>
    </html>
  );
}
```

**Step 2: 使用 Icon 元件**

```tsx
import { Icon } from '@/generated/icons/react';

export function Header() {
  return (
    <header>
      {/* Name 屬性會有自動補全 (IntelliSense) */}
      <Icon name="menu" size={24} />
      <Icon name="account" className="text-blue-500 hover:text-blue-700" />
    </header>
  );
}
```

### 4. 建置與開發

```bash
# 生成圖標 (通常加在 package.json scripts 中)
npx iconforge build

# 查看統計資訊
npx iconforge stats
```

## ⚙️ 設定選項

`iconforge.config.ts` 範例：

```typescript
import { defineConfig } from '@iconforge/core';

export default defineConfig({
  // SVG 來源目錄
  srcDirs: ['./src/assets/icons'],

  // 輸出設定
  output: {
    dir: './src/generated/icons',
    formats: {
      react: true, // 生成 React 元件
      typescript: true, // 生成 TypeScript 定義
    },
  },

  // 顏色處理策略
  colorProcessing: {
    // 'currentColor': 將 fill/stroke 換成 currentColor
    // 'strip': 移除所有 fill/stroke 屬性
    strategy: 'currentColor', 
  },
  
  // SVGO 設定 (會與預設值合併)
  svgo: {
    plugins: [
      // 可在此加入額外的 SVGO plugins
    ]
  }
});
```

## 🛠️ 開發與貢獻

```bash
# 安裝依賴
pnpm install

# 建置所有套件
pnpm build

# 執行測試
pnpm test
```

## 📋 需求

- Node.js >= 24.10.0
- pnpm >= 10.24.0

## 📄 License

[MIT](./LICENSE) © 2025 CJ Yang
