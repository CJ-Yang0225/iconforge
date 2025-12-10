# Changelog

All notable changes to this project will be documented in this file.

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
