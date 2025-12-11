# @iconforge/react

> [English Version](./README.md)

IconForge 的 React 執行環境工具 — 型別安全的圖示元件與 Hooks。

## 概述

`@iconforge/react` 提供 React 專用的型別、hooks 和工廠函數，供 IconForge 生成的元件使用。設計為與 `@iconforge/cli` 的輸出無縫配合。

## 安裝

```bash
# pnpm（推薦）
pnpm add @iconforge/react

# npm
npm install @iconforge/react
```

> **注意**：此套件通常與 `@iconforge/cli` 一起安裝。CLI 生成的 React 元件依賴此套件的型別。

## Peer Dependencies

- `react` >= 16.8.0
- `react-dom` >= 16.8.0

## 匯出內容

### 型別

#### `IconProps`

Icon 元件的 Props 介面。

```typescript
interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** 圖示名稱，必須與生成的 IconName 型別匹配 */
  name: string;
  /** 圖示尺寸，可以是數字 (px) 或字串 */
  size?: number | string;
}
```

#### `SvgSymbolsProps`

SvgSymbols 元件的 Props 介面。

```typescript
interface SvgSymbolsProps {
  /** 可選：只載入指定的圖示 */
  icons?: string[];
  /** 載入完成時的回調 */
  onLoad?: () => void;
}
```

#### `IconMetadata`

圖示元數據介面。

```typescript
interface IconMetadata {
  id: string;
  viewBox: string;
  content: string;
}
```

### Hooks

#### `useIcon`

用於動態存取圖示資訊的 Hook。

```typescript
import { useIcon } from '@iconforge/react';
import { iconRegistry } from '@/generated/icons/react';

function MyComponent() {
  const icon = useIcon('home', iconRegistry);
  
  if (!icon) return null;
  return <div>ViewBox: {icon.viewBox}</div>;
}
```

**參數：**

| 參數       | 型別                      | 說明       |
| ---------- | ------------------------- | ---------- |
| `name`     | `T extends string`        | 圖示名稱   |
| `registry` | `Record<T, IconMetadata>` | 圖示註冊表 |

**回傳：** `IconMetadata | null`

### 工廠函數

#### `createIconComponent`

建立型別安全 Icon 元件的工廠函數。由生成的程式碼內部使用。

```typescript
import { createIconComponent } from '@iconforge/react';

// 在生成的程式碼中
export const Icon = createIconComponent<IconName>();
```

## 與生成元件搭配使用

執行 `iconforge build` 後，會產生使用此套件的元件：

```tsx
// 生成的 Icon 元件內部使用 IconProps
import { Icon } from '@/generated/icons/react';

<Icon name="home" size={24} className="text-blue-500" />
```

生成的 `Icon` 元件：
- 繼承所有 SVG 元素屬性
- 提供型別安全的 `name` prop，有自動補全
- 支援 `size` 為數字 (px) 或 CSS 值字串

## 為什麼需要這個套件？

| 好處           | 說明                            |
| -------------- | ------------------------------- |
| **型別共享**   | CLI 和生成程式碼之間的共用型別  |
| **執行時工具** | 動態圖示使用的 Hooks 和輔助函數 |
| **可擴展性**   | 未來功能的基礎（如延遲載入）    |

## 相關套件

- [@iconforge/core](../core) — 核心處理邏輯
- [@iconforge/cli](../cli) — 命令列介面

## 授權條款

[MIT](../../LICENSE) © 2025 CJ Yang
