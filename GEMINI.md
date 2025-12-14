# IconForge 專案架構與開發指南

這份文件詳細記錄了 IconForge 的專案架構、核心流程與技術細節。

## 1. 專案概述 (Overview)

**IconForge** 是一個專為現代前端開發設計的 SVG 圖示管理工具，支援 **React/Next.js** 和 **Vue/Nuxt**。
它的核心目標是解決 SVG 圖示集成繁瑣、缺乏型別提示 (Type Safety) 以及跨框架兼容性的問題。

**核心價值：**

- **自動化 (Automation)**：自動掃描、優化、生成程式碼。
- **型別安全 (Type Safety)**：自動生成 TypeScript 型別，提供 IDE 自動完成。
- **效能優化 (Performance)**：整合 SVGO 進行深度優化，並採用 Inline Symbols 模式避免 FOUC。
- **跨框架支援 (Cross-Framework)**：同時支援 React 與 Vue 生態系。
- **無障礙 (Accessibility)**：內建 a11y 屬性支援 (`aria-hidden`, `ariaLabel`, `role`)。

---

## 2. 架構設計 (Architecture)

本專案採用 **Monorepo** 架構，使用 **pnpm workspaces** 進行管理。

### 目錄結構

```
iconforge/
├── packages/
│   ├── core/           # 核心邏輯層 (無狀態、純函數)
│   ├── cli/            # 命令行介面層 (與使用者互動)
│   ├── react/          # React Runtime 輔助套件
│   └── vue/            # Vue Runtime 輔助套件 (v0.3.0 新增)
├── examples/
│   ├── react-next-app/ # Next.js 16 範例專案
│   └── vue-nuxt-app/   # Nuxt 4 範例專案 (v0.3.0 新增)
├── pnpm-workspace.yaml # Workspace 定義
└── package.json        # 根目錄設定 (Dev Dependencies)
```

### 套件職責

#### `@iconforge/core` (v0.3.0)

- **職責**：負責所有與「檔案處理」和「SVG 轉換」相關的核心邏輯。
- **主要模組**：
  - `config.ts`: 定義與驗證設定檔 (`zod` schema)，包含 `prefix` 與 `vue` 選項。
  - `loader.ts`: 使用 `fast-glob` 遞迴掃描 SVG 檔案。
  - `optimizer.ts`: 封裝 `svgo`，處理 SVG 優化與顏色轉換 (`currentColor`)。
  - `processor.ts`: 串接 Load -> Optimize 流程，產出中間資料結構 (`ProcessedIcon`)。

#### `@iconforge/cli` (v0.3.0)

- **職責**：提供終端機指令，負責與使用者互動、讀取設定檔、並調用 Core 進行生成。
- **主要指令**：
  - `init`: 初始化專案 (建立 `iconforge.config.ts`, `src/assets/icons`)。
  - `build`: 執行建置流程，生成 React/Vue 元件與 `icon-registry.json`。
  - `validate`: 檢查圖示是否有重複命名或空內容。
- **生成器**：
  - `generators/react.ts`: 生成 React 元件 (含 a11y 屬性)。
  - `generators/vue.ts`: 生成 Vue 元件 (v0.3.0 新增)。
- **技術棧**：`commander`, `inquirer`, `ora`, `chalk`, `jiti`。

#### `@iconforge/react` (v0.3.0)

- **職責**：提供 React Runtime 的型別與輔助函數。
- **匯出**：`IconProps`, `SvgSymbolsProps`, `IconMetadata`, `useIcon`, `createIconComponent`。

#### `@iconforge/vue` (v0.3.0) - 新增

- **職責**：提供 Vue 3 Runtime 的元件與 Composables。
- **匯出**：`Icon`, `SvgSymbols`, `useIcon`, `getIconNames`, `hasIcon`。
- **特色**：完整 a11y 支援、TypeScript 型別定義。

---

## 3. 核心流程 (Core Workflow)

### 3.1 初始化流程 (`init`)

1. 使用者執行 `npx iconforge init`。
2. CLI 詢問確認。
3. 建立 `iconforge.config.ts` (使用預設範本，包含 `prefix` 與 `vue` 選項)。
4. 建立 `src/assets/icons` 目錄。
5. 更新 `.gitignore` (加入生成目錄 `src/components/icons`)。

### 3.2 建置流程 (`build`)

1. **載入設定 (Load Config)**：使用 `jiti` 讀取 `iconforge.config.ts`。
2. **掃描圖示 (Scan)**：根據 `srcDirs` 設定搜尋所有 `.svg` 檔案。
3. **處理與優化 (Process & Optimize)**：透過 `svgo` 進行優化與顏色處理。
4. **程式碼生成 (Generate)**：
   - **React** (若 `formats.react: true`)：生成 `types.ts`, `SvgSymbols.tsx`, `Icon.tsx`, `index.ts`。
   - **Vue** (若 `formats.vue: true`)：生成 `types.ts`, `SvgSymbols.vue`, `Icon.vue`, `useIcon.ts`, `index.ts`。
   - **icon-registry.json**：包含圖示 metadata，供 IDE extension 使用。

---

## 4. 設定檔 (Configuration)

```typescript
// iconforge.config.ts
import { defineConfig } from '@iconforge/cli';

export default defineConfig({
  srcDirs: ['src/assets/icons'],
  prefix: 'iconforge', // 供未來 IDE extension 使用
  output: {
    dir: 'src/components/icons',
    formats: {
      svg: true,
      typescript: true,
      react: true,
      vue: false, // 設為 true 啟用 Vue 生成
    },
  },
  colorProcessing: {
    strategy: 'currentColor', // 'currentColor' | 'strip' | 'preserve'
    preserveColors: [],
  },
});
```

---

## 5. 技術細節與決策 (Technical Details)

### Inline Symbols 模式

- 將所有 SVG `<symbol>` 包裝在 `<SvgSymbols />` 元件中，Layout 層級注入。
- **優點**：SSR 支援、無 FOUC、開發體驗佳。
- **缺點**：圖示數量極大 (>1000) 時 HTML 體積增加。

### 依賴管理

- **pnpm**：使用 `workspace:*` 協議確保 Monorepo 內部套件依賴於本地版本。
- **tsup**：基於 `esbuild`，同時輸出 ESM 與 CJS 格式。
- **vite** (Vue)：用於建置 Vue 元件庫。

---

## 6. 開發指南 (Development Guide)

### 常用指令

```bash
pnpm install      # 安裝所有依賴
pnpm build        # 建置所有 packages
pnpm test         # 執行單元測試 (Vitest)
pnpm lint         # ESLint 檢查
pnpm typecheck    # TypeScript 型別檢查
```

### 新增功能流程

1. 在 `@iconforge/core` 實作邏輯並撰寫測試。
2. 在 `@iconforge/cli` 整合該邏輯並新增對應指令/生成器。
3. 在 `examples/react-next-app` 或 `examples/vue-nuxt-app` 中驗證實際效果。

### 發佈流程

參考 `.agent/workflows/publish.md`。
