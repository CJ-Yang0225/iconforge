# Changelog

All notable changes to this project will be documented in this file.

## [0.2.2] - 2025-12-12

### Fixed

- **Core**: Prevent SVGO from removing default attributes (e.g., `fill="black"`) by adjusting `preset-default` options (`removeUnknownsAndDefaults: { defaultAttrs: false }`). This ensures that `fill="black"` is preserved and correctly converted to `currentColor`.

### Changed

- **React**: Bumped versions to 0.2.2 to ensure consistency across the monorepo.

## [0.3.0] - 2025-12-14

### Added

- **Vue**: 全新 `vue` 生成器與 `@iconforge/vue` runtime 套件支援。
  - 支援 Vue 3 與 Nuxt 3。
  - 提供 `Icon` 元件與 `useIcon` composable。
  - 支援 `ariaLabel` 等無障礙屬性。
  - Config 新增 `vue: boolean` 選項啟用生成。
- **Core**: Config 新增 `prefix` 選項，預設為 `iconforge`。
- **CLI**: 生成 `icon-registry.json`，包含圖示 metadata (viewBox, content)，供未來 IDE extension 使用。
- **React**: `Icon` 元件新增 `ariaLabel` 與 `role` 等無障礙屬性支援。

### Changed

- **CLI**: 預設輸出目錄變更為 `src/components/icons` (原為 `src/generated/icons`)，符合常見專案結構。
- **Docs**: 更新 README 文件，新增 Vue 支援說明與雙語版本。

## [0.2.1] - 2025-12-12

### Fixed

- **Core**: Added `propagateSvgPresentationAttrs` plugin to correctly inherit `fill` and `stroke` attributes from the root `<svg>` element to its children before color conversion. This fixes issues where `fill="currentColor"` on the SVG tag was lost during symbol generation.

## [0.2.0] - 2025-12-10

### Added

- **CLI**: Added `stats` command to analyze icon set usage and sizes.
- **Core**: Enhanced SVGO optimization strategy.
  - Added `removeDimensions`, `sortAttrs`, and `prefixIds` plugins.
  - Implemented `strip` color strategy.
  - Added smart `viewBox` extraction to prevent scaling issues.
- **React**:
  - Exported shared types: `IconProps`, `SvgSymbolsProps`, `IconMetadata`.
  - Added `useIcon` hook for dynamic metadata access.
  - Added `createIconComponent` factory.

### Improved

- **Config**: Fixed configuration merging priority to respect user extensions.
- **Core**: Refactored optimizer plugin chain.

## [0.1.0] - 2025-12-04

### Added

- Initial release.
- **Core**: SVG loader, optimizer, and processor.
- **CLI**: `init`, `build`, `validate` commands.
- **React**: Basic `Icon` and `SvgSymbols` component generation.
