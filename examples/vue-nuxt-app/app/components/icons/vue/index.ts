// Types
export type { IconName } from "./types";
export { iconNames } from "./types";

// Components
export { default as Icon } from "./Icon.vue";
export { default as SvgSymbols } from "./SvgSymbols.vue";

// Composables
export {
  useIcon,
  getIconNames,
  hasIcon,
  iconRegistry,
  type IconMetadata,
  type IconRegistry,
} from "./useIcon";

// Re-export component props types
export type { IconProps } from "./Icon.vue";
