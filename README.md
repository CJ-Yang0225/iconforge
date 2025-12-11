# IconForge

> [English](./README.en.md)

🚧 **Work In Progress** - 目前處於開發階段，API 可能會有變動

現代化的 SVG 圖示管理工具，支援 React、Vue、Web Components 等主流前端框架，提供完整的型別安全與自動化工作流程。

## ✨ 特色功能

| 功能            | 說明                                              |
| --------------- | ------------------------------------------------- |
| 🎯 **型別安全**  | 自動生成 TypeScript 型別，享受完整的 IDE 自動補全 |
| ⚡ **零配置**    | 合理的預設值，開箱即用                            |
| 🎨 **顏色處理**  | 智能 `currentColor` 替換，支援主題切換            |
| 📦 **SVGO 整合** | 內建 SVG 優化功能                                 |
| 🚀 **SSR 友善**  | 內嵌 SVG Symbols 避免 FOUC（未樣式化內容閃爍）    |
| 🔍 **驗證功能**  | 在建置前檢測重複名稱和空圖示                      |
| 📊 **統計資訊**  | 分析圖示數量、大小和優化結果                      |

## 📦 套件說明

此專案採用 Monorepo 架構，包含以下套件：

| 套件                                 | 說明                       |
| ------------------------------------ | -------------------------- |
| [@iconforge/core](./packages/core)   | 核心處理邏輯（載入、優化） |
| [@iconforge/cli](./packages/cli)     | 命令列工具                 |
| [@iconforge/react](./packages/react) | React 執行環境輔助套件     |

## 🚀 快速開始

### 1. 安裝

```bash
# 使用 pnpm（推薦）
pnpm add -D @iconforge/cli @iconforge/react

# 或使用 npm
npm install -D @iconforge/cli @iconforge/react
```

### 2. 初始化專案

```bash
npx iconforge init
```

這將會：
- 建立 `iconforge.config.ts` 設定檔
- 建立 `src/assets/icons` 目錄
- 更新 `.gitignore`

### 3. 加入 SVG 圖示

將 SVG 圖示放入 `src/assets/icons/` 目錄。

### 4. 生成元件

```bash
npx iconforge build
```

### 5. 在 React/Next.js 中使用

**在根 Layout 注入 Symbols：**

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

**使用 Icon 元件：**

```tsx
import { Icon } from '@/generated/icons/react';

export function Navigation() {
  return (
    <nav>
      {/* name 屬性會有自動補全 */}
      <Icon name="home" size={24} />
      <Icon name="settings" className="text-gray-500" />
    </nav>
  );
}
```

## ⚙️ 設定選項

`iconforge.config.ts` 範例：

```typescript
import { defineConfig } from '@iconforge/cli';

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

### 設定選項一覽

| 選項                             | 型別                                      | 預設值                  | 說明                  |
| -------------------------------- | ----------------------------------------- | ----------------------- | --------------------- |
| `srcDirs`                        | `string[]`                                | `['src/assets/icons']`  | 掃描 SVG 檔案的目錄   |
| `output.dir`                     | `string`                                  | `'src/generated/icons'` | 生成檔案的輸出目錄    |
| `output.formats.svg`             | `boolean`                                 | `true`                  | 輸出優化後的 SVG 檔案 |
| `output.formats.typescript`      | `boolean`                                 | `true`                  | 生成 TypeScript 定義  |
| `output.formats.react`           | `boolean`                                 | `true`                  | 生成 React 元件       |
| `colorProcessing.strategy`       | `'currentColor' \| 'strip' \| 'preserve'` | `'currentColor'`        | 顏色處理策略          |
| `colorProcessing.preserveColors` | `string[]`                                | `[]`                    | 要保留的顏色          |
| `svgo.plugins`                   | `Plugin[]`                                | `[]`                    | 額外的 SVGO 插件      |

### 顏色處理策略

| 策略           | 行為                                                       |
| -------------- | ---------------------------------------------------------- |
| `currentColor` | 將 `fill`/`stroke` 替換為 `currentColor`（繼承 CSS color） |
| `strip`        | 移除所有 `fill`/`stroke` 屬性                              |
| `preserve`     | 保留原始顏色不變                                           |

## 📋 CLI 指令

| 指令                 | 說明            |
| -------------------- | --------------- |
| `iconforge init`     | 初始化專案設定  |
| `iconforge build`    | 生成 React 元件 |
| `iconforge validate` | 檢查圖示問題    |
| `iconforge stats`    | 顯示圖示統計    |

詳細使用說明請參閱 [@iconforge/cli README](./packages/cli/README.zh-TW.md)。

## 🛠️ 開發與貢獻

```bash
# 安裝依賴
pnpm install

# 建置所有套件
pnpm build

# 執行測試
pnpm test
```

## 📋 系統需求

- Node.js >= 18
- pnpm >= 10.24.0

## 📄 License

[MIT](./LICENSE) © 2025 CJ Yang
