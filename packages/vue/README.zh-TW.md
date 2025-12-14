# @iconforge/vue

> [English Version](./README.md)

IconForge 的 Vue 執行環境工具 — 型別安全的圖示元件與 Composables。

## 概述

`@iconforge/vue` 提供 Vue 3 專用的型別、composables 和元件，供 IconForge 生成的程式碼使用。設計為與 `@iconforge/cli` 的輸出無縫配合。

## 安裝

```bash
# pnpm（推薦）
pnpm add @iconforge/vue

# npm
npm install @iconforge/vue
```

> **注意**：此套件通常與 `@iconforge/cli` 一起安裝。CLI 生成的 Vue 元件依賴此套件的型別。

## Peer Dependencies

- `vue` >= 3.0.0

## 匯出內容

### 元件

#### `Icon`

主要圖示元件，具備完整無障礙支援。

```vue
<script setup>
import { Icon } from '@iconforge/vue';
</script>

<template>
  <Icon name="home" :size="24" />
  <Icon name="menu" aria-label="開啟選單" />
</template>
```

#### `SvgSymbols`

SVG symbols 容器。在應用程式根層級引入一次即可。

```vue
<script setup>
import { SvgSymbols } from '@iconforge/vue';
</script>

<template>
  <SvgSymbols />
  <!-- 其餘應用程式內容 -->
</template>
```

### 型別

#### `IconProps`

Icon 元件的 Props 介面。

```typescript
interface IconProps {
  /** 圖示名稱（與生成的 IconName 型別匹配） */
  name: string;
  /** 尺寸 (px)，同時套用至寬高 */
  size?: number | string;
  /** 寬度（覆蓋 size） */
  width?: number | string;
  /** 高度（覆蓋 size） */
  height?: number | string;
  /** 顏色（透過 currentColor 套用） */
  color?: string;
  /** 無障礙標籤（供螢幕閱讀器使用） */
  ariaLabel?: string;
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

### Composables

#### `useIcon`

用於動態存取圖示資訊的 Composable。

```vue
<script setup>
import { useIcon } from '@iconforge/vue';

const homeIcon = useIcon('home');
</script>

<template>
  <svg v-if="homeIcon" :viewBox="homeIcon.viewBox">
    <use :href="`#${homeIcon.id}`" />
  </svg>
</template>
```

**回傳：** `ComputedRef<IconMetadata | null>`

#### `getIconNames`

取得所有可用的圖示名稱。

```typescript
import { getIconNames } from '@iconforge/vue';

const names = getIconNames(); // ComputedRef<string[]>
```

#### `hasIcon`

檢查圖示是否存在。

```typescript
import { hasIcon } from '@iconforge/vue';

const exists = hasIcon('home'); // ComputedRef<boolean>
```

## 與生成元件搭配使用

執行 `iconforge build` 並設定 `vue: true` 後，會產生以下元件：

```vue
<script setup>
import { SvgSymbols, Icon } from '@/generated/icons/vue';
</script>

<template>
  <SvgSymbols />
  <Icon name="home" :size="24" color="#333" />
</template>
```

生成的 `Icon` 元件：
- 提供型別安全的 `name` prop，有自動補全
- 支援 `size`、`width`、`height` 和 `color` props
- 包含無障礙屬性 (`aria-hidden`, `focusable`, `ariaLabel`)
- 使用 `v-bind="$attrs"` 進行屬性轉發

## 為什麼需要這個套件？

| 好處           | 說明                                  |
| -------------- | ------------------------------------- |
| **型別共享**   | CLI 和生成程式碼之間的共用型別        |
| **執行時工具** | 動態圖示使用的 Composables 和輔助函數 |
| **可擴展性**   | 未來功能的基礎（如延遲載入）          |

## 相關套件

- [@iconforge/core](../core) — 核心處理邏輯
- [@iconforge/cli](../cli) — 命令列介面
- [@iconforge/react](../react) — React 執行環境工具

## 授權條款

[MIT](../../LICENSE) © 2025 CJ Yang
