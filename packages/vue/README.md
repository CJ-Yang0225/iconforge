# @iconforge/vue

> [繁體中文版](./README.zh-TW.md)

Vue runtime utilities for IconForge — Type-safe icon components and composables.

## Overview

`@iconforge/vue` provides Vue 3-specific types, composables, and components used by IconForge-generated code. Designed to work seamlessly with `@iconforge/cli`.

## Installation

```bash
# pnpm (recommended)
pnpm add @iconforge/vue

# npm
npm install @iconforge/vue
```

> **Note**: This package is typically installed alongside `@iconforge/cli`. The CLI generates Vue components that depend on types from this package.

## Peer Dependencies

- `vue` >= 3.0.0

## Exports

### Components

#### `Icon`

The main icon component with full a11y support.

```vue
<script setup>
import { Icon } from '@iconforge/vue';
</script>

<template>
  <Icon name="home" :size="24" />
  <Icon name="menu" aria-label="Open menu" />
</template>
```

#### `SvgSymbols`

SVG symbols container. Include once at the root of your app.

```vue
<script setup>
import { SvgSymbols } from '@iconforge/vue';
</script>

<template>
  <SvgSymbols />
  <!-- Rest of your app -->
</template>
```

### Types

#### `IconProps`

Props interface for Icon component.

```typescript
interface IconProps {
  /** Icon name (matches generated IconName type) */
  name: string;
  /** Size in px (applies to both width and height) */
  size?: number | string;
  /** Width (overrides size) */
  width?: number | string;
  /** Height (overrides size) */
  height?: number | string;
  /** Color (applies via currentColor) */
  color?: string;
  /** Accessible label (for screen readers) */
  ariaLabel?: string;
}
```

#### `IconMetadata`

Icon metadata interface.

```typescript
interface IconMetadata {
  id: string;
  viewBox: string;
  content: string;
}
```

### Composables

#### `useIcon`

Composable for dynamically accessing icon information.

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

**Returns:** `ComputedRef<IconMetadata | null>`

#### `getIconNames`

Get all available icon names.

```typescript
import { getIconNames } from '@iconforge/vue';

const names = getIconNames(); // ComputedRef<string[]>
```

#### `hasIcon`

Check if an icon exists.

```typescript
import { hasIcon } from '@iconforge/vue';

const exists = hasIcon('home'); // ComputedRef<boolean>
```

## Usage with Generated Components

After running `iconforge build` with `vue: true`, you'll have generated components:

```vue
<script setup>
import { SvgSymbols, Icon } from '@/generated/icons/vue';
</script>

<template>
  <SvgSymbols />
  <Icon name="home" :size="24" color="#333" />
</template>
```

The generated `Icon` component:
- Provides type-safe `name` prop with autocomplete
- Supports `size`, `width`, `height`, and `color` props
- Includes a11y attributes (`aria-hidden`, `focusable`, `ariaLabel`)
- Uses `v-bind="$attrs"` for attribute forwarding

## Why This Package?

| Benefit               | Description                                    |
| --------------------- | ---------------------------------------------- |
| **Type Sharing**      | Common types between CLI and generated code    |
| **Runtime Utilities** | Composables and helpers for dynamic icon usage |
| **Extensibility**     | Foundation for future features (lazy loading)  |

## Related Packages

- [@iconforge/core](../core) — Core processing logic
- [@iconforge/cli](../cli) — Command-line interface
- [@iconforge/react](../react) — React runtime utilities

## License

[MIT](../../LICENSE) © 2025 CJ Yang
