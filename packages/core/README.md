# @iconforge/core

> [繁體中文版](./README.zh-TW.md)

Core library for IconForge — SVG icon processing with optimization and type safety.

## Overview

`@iconforge/core` is the foundational package that handles all SVG processing logic. It's designed to be framework-agnostic and can be used directly or through the CLI.

> **Note**: Most users should use `@iconforge/cli` instead, which provides a command-line interface built on top of this package.

## Installation

```bash
# pnpm
pnpm add @iconforge/core

# npm
npm install @iconforge/core
```

## Modules

### config

Configuration schema and validation using Zod.

```typescript
import { defineConfig, defaultConfig, IconForgeConfig } from '@iconforge/core';

// Define configuration with type safety
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

Scan directories for SVG files using fast-glob.

```typescript
import { loadIcons } from '@iconforge/core';

const icons = await loadIcons(['src/assets/icons']);
// Returns: Array<{ name: string; path: string; content: string }>
```

### optimizer

SVG optimization using SVGO with color processing.

```typescript
import { optimizeSvg } from '@iconforge/core';

const optimized = await optimizeSvg(svgContent, {
  strategy: 'currentColor',
  preserveColors: ['#FF5722'],
});
```

### processor

High-level API that combines loading and optimization.

```typescript
import { processIcons } from '@iconforge/core';

const processed = await processIcons(config);
// Returns: Array<ProcessedIcon>
```

## API Reference

### `defineConfig(config)`

Creates a validated configuration object.

| Parameter | Type                       | Description           |
| --------- | -------------------------- | --------------------- |
| `config`  | `Partial<IconForgeConfig>` | Configuration options |

**Returns**: `IconForgeConfig` — Merged configuration with defaults.

---

### `loadIcons(srcDirs)`

Scans directories for SVG files.

| Parameter | Type       | Description         |
| --------- | ---------- | ------------------- |
| `srcDirs` | `string[]` | Directories to scan |

**Returns**: `Promise<RawIcon[]>` — Array of raw icon data.

---

### `optimizeSvg(content, colorProcessing)`

Optimizes SVG content using SVGO.

| Parameter         | Type                    | Description            |
| ----------------- | ----------------------- | ---------------------- |
| `content`         | `string`                | Raw SVG content        |
| `colorProcessing` | `ColorProcessingConfig` | Color handling options |

**Returns**: `Promise<string>` — Optimized SVG content.

---

### `processIcons(config)`

Loads and optimizes all icons based on configuration.

| Parameter | Type              | Description               |
| --------- | ----------------- | ------------------------- |
| `config`  | `IconForgeConfig` | Full configuration object |

**Returns**: `Promise<ProcessedIcon[]>` — Array of processed icons.

## Types

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

## Related Packages

- [@iconforge/cli](../cli) — Command-line interface
- [@iconforge/react](../react) — React runtime utilities

## License

[MIT](../../LICENSE) © 2025 CJ Yang
