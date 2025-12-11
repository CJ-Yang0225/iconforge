# @iconforge/cli

> [English Version](./README.md)

IconForge 的命令列工具 — 一個指令就能從 SVG 檔案生成型別安全的 React 圖標元件。

## 什麼是 IconForge？

**IconForge** 是現代化的跨框架 SVG 圖標管理工具，支援 React、Vue、Web Components 等主流前端框架。它自動化處理 SVG 圖標整合的繁瑣工作：

- **掃描** 你的 SVG 圖標目錄
- **優化** 使用 SVGO 壓縮 SVG
- **生成** 型別安全的元件，提供完整的 IntelliSense 支援
- **輸出** SSR 友善的 SVG Sprite 系統（無 FOUC 問題！）

這個 CLI 套件 (`@iconforge/cli`) 是協調整個工作流程的命令列介面。

## 快速開始

```bash
# 1. 安裝 CLI 和 React 執行環境套件
pnpm add -D @iconforge/cli @iconforge/react

# 2. 初始化設定
npx iconforge init

# 3. 將 SVG 圖標放入 src/assets/icons/

# 4. 生成元件
npx iconforge build
```

## 功能特色

| 功能            | 說明                                              |
| --------------- | ------------------------------------------------- |
| 🎯 **型別安全**  | 自動生成 TypeScript 型別，享受完整的 IDE 自動補全 |
| ⚡ **零配置**    | 合理的預設值，開箱即用                            |
| 🎨 **顏色處理**  | 智能 `currentColor` 替換，支援主題切換            |
| 📦 **SVGO 整合** | 內建 SVG 優化功能                                 |
| 🚀 **SSR 友善**  | 內嵌 SVG Symbols 避免未樣式化內容閃爍             |
| 🔍 **驗證功能**  | 在建置前檢測重複名稱和空圖標                      |
| 📊 **統計資訊**  | 分析圖標數量、大小和優化結果                      |

## 安裝

```bash
# pnpm（推薦）
pnpm add -D @iconforge/cli

# npm
npm install -D @iconforge/cli

# yarn
yarn add -D @iconforge/cli
```

> **注意**：通常你也會需要 `@iconforge/react` 來提供執行環境輔助功能。

## 使用方式

### CLI 指令

#### `iconforge init`

在專案中初始化 IconForge，這會建立：

- `iconforge.config.ts` — 設定檔
- `src/assets/icons/` — 預設的圖標來源目錄
- 更新 `.gitignore` 以排除生成的檔案

```bash
npx iconforge init
```

---

#### `iconforge build`

處理所有 SVG 檔案並生成 React 元件。

```bash
npx iconforge build
```

**生成的輸出**（在 `src/generated/icons/react/`）：

| 檔案             | 用途                                  |
| ---------------- | ------------------------------------- |
| `types.ts`       | `IconName` 聯合型別，提供型別安全     |
| `SvgSymbols.tsx` | 包含所有圖標定義的 SVG Sprite         |
| `Icon.tsx`       | 帶有 `name`、`size` 屬性的 React 元件 |
| `index.ts`       | 統一匯出檔                            |

---

#### `iconforge validate`

在建置前檢查圖標是否有常見問題。

```bash
npx iconforge validate
```

**檢查項目：**
- 跨目錄的重複圖標名稱
- 空的或格式錯誤的 SVG 內容

---

#### `iconforge stats`

顯示圖標統計資訊和優化指標。

```bash
npx iconforge stats
```

**顯示內容：**
- 圖標總數
- 合併檔案大小（優化前/後）
- 最小和最大的圖標
- 完整圖標列表及個別大小

## 設定

### 設定檔

執行 `iconforge init` 後，你會得到一個 `iconforge.config.ts` 檔案：

```typescript
import { defineConfig } from '@iconforge/core';

export default defineConfig({
  srcDirs: ['src/assets/icons'],
  output: {
    dir: 'src/generated/icons',
    formats: {
      svg: true,
      typescript: true,
      react: true,
    },
  },
  colorProcessing: {
    strategy: 'currentColor',
    preserveColors: [],
  },
});
```

### 設定選項

| 選項                             | 型別                                      | 預設值                  | 說明                               |
| -------------------------------- | ----------------------------------------- | ----------------------- | ---------------------------------- |
| `srcDirs`                        | `string[]`                                | `['src/assets/icons']`  | 掃描 SVG 檔案的目錄                |
| `output.dir`                     | `string`                                  | `'src/generated/icons'` | 生成檔案的輸出目錄                 |
| `output.formats.svg`             | `boolean`                                 | `true`                  | 輸出優化後的 SVG 檔案              |
| `output.formats.typescript`      | `boolean`                                 | `true`                  | 生成 TypeScript 定義               |
| `output.formats.react`           | `boolean`                                 | `true`                  | 生成 React 元件                    |
| `colorProcessing.strategy`       | `'currentColor' \| 'strip' \| 'preserve'` | `'currentColor'`        | 處理 fill/stroke 顏色的方式        |
| `colorProcessing.preserveColors` | `string[]`                                | `[]`                    | 要保留的顏色（例如 `['#FF0000']`） |
| `svgo.plugins`                   | `Plugin[]`                                | `[]`                    | 額外的 SVGO 插件                   |

#### 顏色處理策略

| 策略           | 行為                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| `currentColor` | 將 `fill` 和 `stroke` 替換為 `currentColor`（繼承 CSS 的 `color` 屬性） |
| `strip`        | 移除所有 `fill` 和 `stroke` 屬性                                        |
| `preserve`     | 保留原始顏色不變                                                        |

## 範例

### 基本 React/Next.js 設定

**1. 在根 Layout 加入 SvgSymbols：**

```tsx
// app/layout.tsx (Next.js App Router)
import { SvgSymbols } from '@/generated/icons/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SvgSymbols />
        {children}
      </body>
    </html>
  );
}
```

**2. 使用 Icon 元件：**

```tsx
import { Icon } from '@/generated/icons/react';

export function Navigation() {
  return (
    <nav>
      <Icon name="home" size={24} />
      <Icon name="settings" className="text-gray-500" />
      <Icon name="user" size="1.5rem" />
    </nav>
  );
}
```

### 多個來源目錄

```typescript
// iconforge.config.ts
export default defineConfig({
  srcDirs: [
    'src/assets/icons/ui',
    'src/assets/icons/social',
    'src/assets/icons/brand',
  ],
});
```

### 保留特定顏色

```typescript
// iconforge.config.ts
export default defineConfig({
  colorProcessing: {
    strategy: 'currentColor',
    preserveColors: ['#FF5722', '#4CAF50'], // 保留品牌色
  },
});
```

### 加入 package.json Scripts

```json
{
  "scripts": {
    "icons": "iconforge build",
    "icons:check": "iconforge validate",
    "icons:stats": "iconforge stats",
    "prebuild": "iconforge build"
  }
}
```

## 最佳實踐

### 專案結構

```
src/
├── assets/
│   └── icons/          # 來源 SVG 檔案
│       ├── arrow-left.svg
│       ├── arrow-right.svg
│       └── menu.svg
├── generated/
│   └── icons/          # 生成的檔案（加入 gitignore）
│       └── react/
│           ├── Icon.tsx
│           ├── SvgSymbols.tsx
│           ├── types.ts
│           └── index.ts
└── components/
    └── Button.tsx      # 使用 <Icon name="..." />
```

### 命名慣例

- SVG 檔名使用 `kebab-case`：`arrow-left.svg`、`chevron-down.svg`
- 避免特殊字元和空格
- 名稱要有描述性但簡潔

### Git 工作流程

生成的檔案應該從版本控制中排除：

```gitignore
# .gitignore
src/generated/icons
```

在 CI/CD 流程中或作為 prebuild 步驟執行 `iconforge build`。

## 效能與優化

### 為什麼使用內嵌 SVG Symbols？

IconForge 對 React/Next.js 使用**內嵌 SVG Sprite** 方式：

| 優點            | 說明                                        |
| --------------- | ------------------------------------------- |
| **無 FOUC**     | Symbols 在初始 HTML 中，沒有載入延遲        |
| **SSR 兼容**    | 適用於伺服器端渲染，無 hydration 不匹配問題 |
| **單一 Bundle** | 所有圖標在一個元件中，有利於 tree-shaking   |
| **CSS 樣式**    | 使用 `currentColor` 實現動態主題            |

### Bundle 大小考量

- SVGO 優化通常可將 SVG 大小減少 30-60%
- 對於超過 100 個圖標的專案，考慮延遲載入或外部 Sprite（未來功能）
- 使用 `iconforge stats` 監控你的圖標 bundle 大小

## 常見問題

### Icon 元件沒有顯示任何東西？

確保 `<SvgSymbols />` 在 DOM 樹中**先於**任何 `<Icon />` 元件渲染。將它放在根 layout 的頂部。

### 如何新增圖標？

1. 將 `.svg` 檔案放入來源目錄
2. 執行 `npx iconforge build`
3. 新的圖標名稱將具有完整的型別安全支援

### 可以使用自訂 SVGO 插件嗎？

可以！在設定中的 `svgo.plugins` 陣列中加入：

```typescript
export default defineConfig({
  svgo: {
    plugins: [
      { name: 'removeComments' },
      { name: 'removeTitle' },
    ],
  },
});
```

### 適用於 Vite 嗎？

可以！生成的 React 元件是框架無關的。在你的 `main.tsx` 或 `App.tsx` 中加入 `<SvgSymbols />`。

### 為什麼用 TypeScript 設定檔而不是 JSON？

使用 `iconforge.config.ts` 提供：
- 完整的型別檢查和自動補全
- 可以引入 `defineConfig` 等輔助函式
- 需要時可進行動態設定

---

## 系統需求

- Node.js >= 18
- React >= 17（用於生成的元件）

## 相關套件

- [@iconforge/core](../core) — 核心處理邏輯
- [@iconforge/react](../react) — React 執行環境工具

## 授權條款

[MIT](../../LICENSE) © 2025 CJ Yang
