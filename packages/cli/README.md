# @iconforge/cli

> [繁體中文版](./README.zh-TW.md)

Command-line interface for IconForge — Generate type-safe React icon components from SVG files with a single command.

## What is IconForge?

**IconForge** is a modern, cross-framework SVG icon management tool supporting React, Vue, Web Components, and more. It automates the boring parts of SVG icon integration:

- **Scans** your SVG icon directories
- **Optimizes** SVGs using SVGO
- **Generates** type-safe components with full IntelliSense support
- **Outputs** an SVG sprite system that's SSR-friendly (no FOUC!)

This CLI package (`@iconforge/cli`) is the command-line interface that orchestrates this entire workflow.

## Quick Start

```bash
# 1. Install the CLI and React runtime
pnpm add -D @iconforge/cli @iconforge/react

# 2. Initialize configuration
npx iconforge init

# 3. Add your SVG icons to src/assets/icons/

# 4. Generate components
npx iconforge build
```

## Features

| Feature                | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| 🎯 **Type Safety**      | Auto-generated TypeScript types with full IDE autocomplete |
| ⚡ **Zero Config**      | Sensible defaults that work out of the box                 |
| 🎨 **Color Processing** | Smart `currentColor` replacement for theme support         |
| 📦 **SVGO Integration** | Built-in SVG optimization                                  |
| 🚀 **SSR-Friendly**     | Inline SVG symbols prevent flash of unstyled content       |
| 🔍 **Validation**       | Detect duplicate names and empty icons before build        |
| 📊 **Statistics**       | Analyze icon count, sizes, and optimization results        |

## Installation

```bash
# pnpm (recommended)
pnpm add -D @iconforge/cli

# npm
npm install -D @iconforge/cli

# yarn
yarn add -D @iconforge/cli
```

> **Note**: You'll typically also want `@iconforge/react` for the runtime helpers.

## Usage

### CLI Commands

#### `iconforge init`

Initialize IconForge in your project. This creates:

- `iconforge.config.ts` — Configuration file
- `src/assets/icons/` — Default icon source directory
- Updates `.gitignore` to exclude generated files

```bash
npx iconforge init
```

---

#### `iconforge build`

Process all SVG files and generate React components.

```bash
npx iconforge build
```

**Generated output** (in `src/generated/icons/react/`):

| File             | Purpose                                    |
| ---------------- | ------------------------------------------ |
| `types.ts`       | `IconName` union type for type safety      |
| `SvgSymbols.tsx` | SVG sprite containing all icon definitions |
| `Icon.tsx`       | React component with `name`, `size` props  |
| `index.ts`       | Barrel export                              |

---

#### `iconforge validate`

Check icons for common issues before building.

```bash
npx iconforge validate
```

**Checks for:**
- Duplicate icon names across directories
- Empty or malformed SVG content

---

#### `iconforge stats`

Display icon statistics and optimization metrics.

```bash
npx iconforge stats
```

**Shows:**
- Total icon count
- Combined file size (before/after optimization)
- Smallest and largest icons
- Full icon listing with individual sizes

## Configuration

### Configuration File

After running `iconforge init`, you'll have an `iconforge.config.ts` file:

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

### Configuration Options

| Option                           | Type                                      | Default                 | Description                              |
| -------------------------------- | ----------------------------------------- | ----------------------- | ---------------------------------------- |
| `srcDirs`                        | `string[]`                                | `['src/assets/icons']`  | Directories to scan for SVG files        |
| `output.dir`                     | `string`                                  | `'src/generated/icons'` | Output directory for generated files     |
| `output.formats.svg`             | `boolean`                                 | `true`                  | Output optimized SVG files               |
| `output.formats.typescript`      | `boolean`                                 | `true`                  | Generate TypeScript definitions          |
| `output.formats.react`           | `boolean`                                 | `true`                  | Generate React components                |
| `colorProcessing.strategy`       | `'currentColor' \| 'strip' \| 'preserve'` | `'currentColor'`        | How to handle fill/stroke colors         |
| `colorProcessing.preserveColors` | `string[]`                                | `[]`                    | Colors to preserve (e.g., `['#FF0000']`) |
| `svgo.plugins`                   | `Plugin[]`                                | `[]`                    | Additional SVGO plugins                  |

#### Color Processing Strategies

| Strategy       | Behavior                                                                   |
| -------------- | -------------------------------------------------------------------------- |
| `currentColor` | Replace `fill` and `stroke` with `currentColor` (inherit from CSS `color`) |
| `strip`        | Remove all `fill` and `stroke` attributes                                  |
| `preserve`     | Keep original colors unchanged                                             |

## Examples

### Basic React/Next.js Setup

**1. Add SvgSymbols to your root layout:**

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

**2. Use the Icon component:**

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

### Multiple Source Directories

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

### Preserve Specific Colors

```typescript
// iconforge.config.ts
export default defineConfig({
  colorProcessing: {
    strategy: 'currentColor',
    preserveColors: ['#FF5722', '#4CAF50'], // Keep brand colors
  },
});
```

### Add to package.json Scripts

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

## Best Practices

### Project Structure

```
src/
├── assets/
│   └── icons/          # Source SVG files
│       ├── arrow-left.svg
│       ├── arrow-right.svg
│       └── menu.svg
├── generated/
│   └── icons/          # Generated (gitignored)
│       └── react/
│           ├── Icon.tsx
│           ├── SvgSymbols.tsx
│           ├── types.ts
│           └── index.ts
└── components/
    └── Button.tsx      # Uses <Icon name="..." />
```

### Naming Conventions

- Use `kebab-case` for SVG filenames: `arrow-left.svg`, `chevron-down.svg`
- Avoid special characters and spaces
- Keep names descriptive but concise

### Git Workflow

Generated files should be excluded from version control:

```gitignore
# .gitignore
src/generated/icons
```

Run `iconforge build` in your CI/CD pipeline or as a prebuild step.

## Performance & Optimization

### Why Inline SVG Symbols?

IconForge uses an **inline SVG sprite** approach for React/Next.js:

| Benefit            | Explanation                                                   |
| ------------------ | ------------------------------------------------------------- |
| **No FOUC**        | Symbols are in the initial HTML, no loading delay             |
| **SSR Compatible** | Works with Server-Side Rendering without hydration mismatches |
| **Single Bundle**  | All icons in one component, efficient for tree-shaking        |
| **CSS Styling**    | Use `currentColor` for dynamic theming                        |

### Bundle Size Considerations

- SVGO optimization typically reduces SVG size by 30-60%
- For projects with 100+ icons, consider lazy-loading or external sprites (future feature)
- Use `iconforge stats` to monitor your icon bundle size

## FAQ

### The Icon component doesn't show anything?

Make sure `<SvgSymbols />` is rendered **before** any `<Icon />` components in the DOM tree. Place it at the top of your root layout.

### How do I add new icons?

1. Add the `.svg` file to your source directory
2. Run `npx iconforge build`
3. The new icon name will be available with full type safety

### Can I use custom SVGO plugins?

Yes! Add them to the `svgo.plugins` array in your config:

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

### Does it work with Vite?

Yes! The generated React components are framework-agnostic. Add `<SvgSymbols />` to your `main.tsx` or `App.tsx`.

### Why TypeScript config instead of JSON?

Using `iconforge.config.ts` provides:
- Full type checking and autocomplete
- Ability to import helpers like `defineConfig`
- Dynamic configuration if needed

---

## Requirements

- Node.js >= 18
- React >= 17 (for generated components)

## Related Packages

- [@iconforge/core](../core) — Core processing logic
- [@iconforge/react](../react) — React runtime utilities

## License

[MIT](../../LICENSE) © 2025 CJ Yang
