# @iconforge/react

> [繁體中文版](./README.zh-TW.md)

React runtime utilities for IconForge — Type-safe icon components and hooks.

## Overview

`@iconforge/react` provides React-specific types, hooks, and factory functions used by IconForge-generated components. It's designed to work seamlessly with the output from `@iconforge/cli`.

## Installation

```bash
# pnpm (recommended)
pnpm add @iconforge/react

# npm
npm install @iconforge/react
```

> **Note**: This package is typically installed alongside `@iconforge/cli`. The CLI generates React components that depend on types from this package.

## Peer Dependencies

- `react` >= 16.8.0
- `react-dom` >= 16.8.0

## Exports

### Types

#### `IconProps`

Props interface for Icon components.

```typescript
interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon name, must match generated IconName type */
  name: string;
  /** Icon size, can be number (px) or string */
  size?: number | string;
  /** Accessible label (for screen readers) */
  ariaLabel?: string;
}
```

#### `SvgSymbolsProps`

Props interface for SvgSymbols component.

```typescript
interface SvgSymbolsProps {
  /** Optional: only load specific icons */
  icons?: string[];
  /** Callback when symbols are loaded */
  onLoad?: () => void;
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

### Hooks

#### `useIcon`

Hook for dynamically accessing icon information.

```typescript
import { useIcon } from '@iconforge/react';
import { iconRegistry } from '@/generated/icons/react';

function MyComponent() {
  const icon = useIcon('home', iconRegistry);
  
  if (!icon) return null;
  return <div>ViewBox: {icon.viewBox}</div>;
}
```

**Parameters:**

| Parameter  | Type                      | Description       |
| ---------- | ------------------------- | ----------------- |
| `name`     | `T extends string`        | Icon name         |
| `registry` | `Record<T, IconMetadata>` | Icon registry map |

**Returns:** `IconMetadata | null`

### Factory Functions

#### `createIconComponent`

Factory function for creating type-safe Icon components. Used internally by generated code.

```typescript
import { createIconComponent } from '@iconforge/react';

// In generated code
export const Icon = createIconComponent<IconName>();
```

## Usage with Generated Components

After running `iconforge build`, you'll have generated components that use this package:

```tsx
// Generated Icon component uses IconProps internally
import { Icon } from '@/generated/icons/react';

<Icon name="home" size={24} className="text-blue-500" />
```

The generated `Icon` component:
- Extends all SVG element attributes
- Provides type-safe `name` prop with autocomplete
- Supports `size` as number (px) or CSS value string
- Includes a11y attributes (`aria-hidden`, `focusable`, `ariaLabel`)

## Why This Package?

| Benefit               | Description                                   |
| --------------------- | --------------------------------------------- |
| **Type Sharing**      | Common types between CLI and generated code   |
| **Runtime Utilities** | Hooks and helpers for dynamic icon usage      |
| **Extensibility**     | Foundation for future features (lazy loading) |

## Related Packages

- [@iconforge/core](../core) — Core processing logic
- [@iconforge/cli](../cli) — Command-line interface

## License

[MIT](../../LICENSE) © 2025 CJ Yang
