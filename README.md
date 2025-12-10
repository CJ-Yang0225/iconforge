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
- **[@iconforge/react](./packages/react)** - React 執行環境輔助套件（開發中）

## 🚀 快速開始

### 安裝

```bash
# 使用 pnpm（推薦）
pnpm add -D @iconforge/cli

# 或使用 npm
npm install -D @iconforge/cli

# 或使用 yarn
yarn add -D @iconforge/cli
```

### 初始化專案

```bash
npx iconforge init
```

### 建置圖標元件

```bash
npx iconforge build
```

### 使用範例

```tsx
import { Icon } from '@/components/icons/react';

export default function App() {
  return (
    <div>
      <Icon name="home" size={24} />
      <Icon name="search" className="text-blue-500" />
    </div>
  );
}
```

## 📖 文件

> 📝 詳細文件撰寫中，敬請期待

- [安裝指南](#)
- [設定選項](#)
- [API 參考](#)
- [遷移指南](#)

## 🛠️ 開發

```bash
# 安裝依賴
pnpm install

# 建置所有套件
pnpm build

# 執行測試
pnpm test

# Lint 檢查
pnpm lint

# 格式化程式碼
pnpm format
```

## 📋 需求

- Node.js >= 24.10.0
- pnpm >= 10.24.0

## 📄 License

[MIT](./LICENSE) © 2025 CJ Yang

## 🤝 貢獻

目前專案仍在初期開發階段，歡迎回報 Issues 或提出建議！

---

Made with ❤️ by [CJ Yang](https://github.com/CJ-Yang0225)
