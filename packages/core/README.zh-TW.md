# @iconforge/core

> [English Version](./README.md)

IconForge 核心函式庫 — SVG 圖示處理，包含優化與型別安全。

## 概述

`@iconforge/core` 是處理所有 SVG 處理邏輯的基礎套件。設計為框架無關，可以直接使用或透過 CLI 使用。

> **注意**：大多數使用者應該使用 `@iconforge/cli`，它提供了建立在此套件之上的命令列介面。

## 安裝

```bash
# pnpm
pnpm add @iconforge/core

# npm
npm install @iconforge/core
```

## 模組

### config

使用 Zod 進行設定 schema 與驗證。

```typescript
import { defineConfig, defaultConfig, IconForgeConfig } from '@iconforge/core';

// 定義型別安全的設定
const config = defineConfig({
  srcDirs: ['src/assets/icons'],
  output: {
    dir: 'src/generated/icons',
    formats: {
      react: true,
      typescript: true,
    },
  },
});
```

### loader

使用 fast-glob 掃描目錄中的 SVG 檔案。

```typescript
import { loadIcons } from '@iconforge/core';

const icons = await loadIcons(['src/assets/icons']);
// 回傳: Array<{ name: string; path: string; content: string }>
```

### optimizer

使用 SVGO 進行 SVG 優化與顏色處理。

```typescript
import { optimizeSvg } from '@iconforge/core';

const optimized = await optimizeSvg(svgContent, {
  strategy: 'currentColor',
  preserveColors: ['#FF5722'],
});
```

### processor

整合載入與優化的高階 API。

```typescript
import { processIcons } from '@iconforge/core';

const processed = await processIcons(config);
// 回傳: Array<ProcessedIcon>
```

## API 參考

### `defineConfig(config)`

建立經過驗證的設定物件。

| 參數     | 型別                       | 說明     |
| -------- | -------------------------- | -------- |
| `config` | `Partial<IconForgeConfig>` | 設定選項 |

**回傳**: `IconForgeConfig` — 合併預設值後的設定。

---

### `loadIcons(srcDirs)`

掃描目錄中的 SVG 檔案。

| 參數      | 型別       | 說明         |
| --------- | ---------- | ------------ |
| `srcDirs` | `string[]` | 要掃描的目錄 |

**回傳**: `Promise<RawIcon[]>` — 原始圖示資料陣列。

---

### `optimizeSvg(content, colorProcessing)`

使用 SVGO 優化 SVG 內容。

| 參數              | 型別                    | 說明          |
| ----------------- | ----------------------- | ------------- |
| `content`         | `string`                | 原始 SVG 內容 |
| `colorProcessing` | `ColorProcessingConfig` | 顏色處理選項  |

**回傳**: `Promise<string>` — 優化後的 SVG 內容。

---

### `processIcons(config)`

根據設定載入並優化所有圖示。

| 參數     | 型別              | 說明         |
| -------- | ----------------- | ------------ |
| `config` | `IconForgeConfig` | 完整設定物件 |

**回傳**: `Promise<ProcessedIcon[]>` — 處理後的圖示陣列。

## 型別定義

```typescript
interface RawIcon {
  name: string;
  path: string;
  content: string;
}

interface ProcessedIcon {
  id: string;
  viewBox: string;
  content: string;
  originalSize: number;
  optimizedSize: number;
}

interface ColorProcessingConfig {
  strategy: 'currentColor' | 'strip' | 'preserve';
  preserveColors?: string[];
}
```

## 相關套件

- [@iconforge/cli](../cli) — 命令列介面
- [@iconforge/react](../react) — React 執行環境工具

## 授權條款

[MIT](../../LICENSE) © 2025 CJ Yang
