// Components
export { default as Icon } from "./Icon.vue";
export { default as SvgSymbols } from "./SvgSymbols.vue";

// Composables
export {
  useIcon,
  setIconRegistry,
  getIconNames,
  hasIcon,
  type IconMetadata,
  type IconRegistry,
} from "./useIcon";

// Re-export component props types
export type { IconProps } from "./Icon.vue";
export type { SvgSymbolsProps } from "./SvgSymbols.vue";
