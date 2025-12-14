import { computed, ref, type ComputedRef, type Ref } from "vue";
import type { IconName } from "./types";

/**
 * Icon metadata
 */
export interface IconMetadata {
  id: IconName;
  viewBox: string;
  content: string;
}

/**
 * Icon registry type
 */
export type IconRegistry = Record<IconName, IconMetadata>;

/**
 * Internal registry - populated by iconRegistry below
 */
const internalRegistry: Ref<IconRegistry> = ref({} as IconRegistry);

/**
 * Icon registry with all icon metadata
 */
export const iconRegistry: IconRegistry = {
  close: {
    id: "close",
    viewBox: "0 0 24 24",
    content:
      '<path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor"/>',
  },
  home: {
    id: "home",
    viewBox: "0 0 24 24",
    content:
      '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor"/><path d="M9 22V12h6v10" fill="none" stroke="currentColor"/>',
  },
  menu: {
    id: "menu",
    viewBox: "0 0 24 24",
    content:
      '<path d="M3 12h18M3 6h18M3 18h18" fill="none" stroke="currentColor"/>',
  },
};

// Initialize internal registry
internalRegistry.value = iconRegistry;

/**
 * useIcon composable - get icon metadata reactively
 * @param name - Icon name
 * @returns Icon metadata or null
 *
 * @example
 * ```vue
 * <script setup>
 * import { useIcon } from './useIcon';
 * const homeIcon = useIcon('home');
 * </script>
 *
 * <template>
 *   <svg v-if="homeIcon" :viewBox="homeIcon.viewBox">
 *     <use :href="`#${homeIcon.id}`" />
 *   </svg>
 * </template>
 * ```
 */
export function useIcon(name: IconName): ComputedRef<IconMetadata | null> {
  return computed(() => internalRegistry.value[name] ?? null);
}

/**
 * Get all available icon names
 */
export function getIconNames(): ComputedRef<IconName[]> {
  return computed(() => Object.keys(internalRegistry.value) as IconName[]);
}

/**
 * Check if an icon exists
 */
export function hasIcon(name: string): ComputedRef<boolean> {
  return computed(() => name in internalRegistry.value);
}
