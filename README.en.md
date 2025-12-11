# IconForge

> [繁體中文](./README.md)

🚧 **Work In Progress** - Currently in development, API may change

A modern SVG icon management tool designed for React/Next.js, providing complete type safety and automated workflows.

## ✨ Features

| Feature                | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| 🎯 **Type Safety**      | Auto-generated TypeScript types with full IDE autocomplete |
| ⚡ **Zero Config**      | Sensible defaults that work out of the box                 |
| 🎨 **Color Processing** | Smart `currentColor` replacement for theme support         |
| 📦 **SVGO Integration** | Built-in SVG optimization                                  |
| 🚀 **SSR-Friendly**     | Inline SVG symbols prevent FOUC                            |
| 🔍 **Validation**       | Detect duplicate names and empty icons before build        |
| 📊 **Statistics**       | Analyze icon count, sizes, and optimization results        |

## 📦 Packages

This project uses a monorepo architecture with the following packages:

| Package                              | Description                            |
| ------------------------------------ | -------------------------------------- |
| [@iconforge/core](./packages/core)   | Core processing logic (load, optimize) |
| [@iconforge/cli](./packages/cli)     | Command-line interface                 |
| [@iconforge/react](./packages/react) | React runtime utilities                |

## 🚀 Quick Start

IconForge CLI supports two ways to use:

### Option 1: Without Installing Dependencies (Lightweight)

Run directly via `npx` without installing any dependencies:

```bash
# Initialize project
npx @iconforge/cli init

# Generate components
npx @iconforge/cli build
```

> Suitable for quick trials or when you don't need built-in type hints.

---

### Option 2: Install as Dev Dependency (Recommended)

Install for full type hints and faster execution:

```bash
# Using pnpm (recommended)
pnpm add -D @iconforge/cli @iconforge/react

# Or using npm
npm install -D @iconforge/cli @iconforge/react
```

After installation, you have multiple ways to run:

```bash
# Using pnpm exec
pnpm exec iconforge init
pnpm exec iconforge build

# Or using npx (will use locally installed version first)
npx iconforge build
```

**Recommended: Add to `package.json` scripts**

```json
{
  "scripts": {
    "icons": "iconforge build",
    "icons:check": "iconforge validate",
    "icons:stats": "iconforge stats"
  }
}
```

Then just run:

```bash
pnpm icons        # Generate components
pnpm icons:check  # Check icons
pnpm icons:stats  # View statistics
```

---

### Initialize Project

```bash
npx @iconforge/cli init
# Or if installed: pnpm exec iconforge init
```

This will:
- Create `iconforge.config.ts` configuration file
- Create `src/assets/icons` directory
- Update `.gitignore`

### Add SVG Icons

Place your SVG icons in the `src/assets/icons/` directory.

### Generate Components

```bash
npx @iconforge/cli build
# Or if installed: pnpm exec iconforge build
```

### Use in React/Next.js

**Add SvgSymbols to your root layout:**

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

**Use the Icon component:**

```tsx
import { Icon } from '@/generated/icons/react';

export function Navigation() {
  return (
    <nav>
      {/* name prop has autocomplete */}
      <Icon name="home" size={24} />
      <Icon name="settings" className="text-gray-500" />
    </nav>
  );
}
```

## ⚙️ Configuration

Example `iconforge.config.ts`:

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

### Configuration Options

| Option                           | Type                                      | Default                 | Description                          |
| -------------------------------- | ----------------------------------------- | ----------------------- | ------------------------------------ |
| `srcDirs`                        | `string[]`                                | `['src/assets/icons']`  | Directories to scan for SVG files    |
| `output.dir`                     | `string`                                  | `'src/generated/icons'` | Output directory for generated files |
| `output.formats.svg`             | `boolean`                                 | `true`                  | Output optimized SVG files           |
| `output.formats.typescript`      | `boolean`                                 | `true`                  | Generate TypeScript definitions      |
| `output.formats.react`           | `boolean`                                 | `true`                  | Generate React components            |
| `colorProcessing.strategy`       | `'currentColor' \| 'strip' \| 'preserve'` | `'currentColor'`        | Color processing strategy            |
| `colorProcessing.preserveColors` | `string[]`                                | `[]`                    | Colors to preserve                   |
| `svgo.plugins`                   | `Plugin[]`                                | `[]`                    | Additional SVGO plugins              |

### Color Processing Strategies

| Strategy       | Behavior                                                  |
| -------------- | --------------------------------------------------------- |
| `currentColor` | Replace `fill`/`stroke` with `currentColor` (inherit CSS) |
| `strip`        | Remove all `fill`/`stroke` attributes                     |
| `preserve`     | Keep original colors unchanged                            |

## 📋 CLI Commands

| Command              | Description               |
| -------------------- | ------------------------- |
| `iconforge init`     | Initialize project config |
| `iconforge build`    | Generate React components |
| `iconforge validate` | Check for icon issues     |
| `iconforge stats`    | Display icon statistics   |

See [@iconforge/cli README](./packages/cli/README.md) for detailed documentation.

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## 📋 Requirements

- Node.js >= 18
- pnpm >= 10.24.0

## 📄 License

[MIT](./LICENSE) © 2025 CJ Yang
