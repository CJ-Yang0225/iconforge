import { ref, computed, type Ref, type ComputedRef } from "vue";

/**
 * Icon 元數據
 */
export interface IconMetadata {
  id: string;
  viewBox: string;
  content: string;
}

/**
 * Icon Registry 型別
 */
export type IconRegistry = Record<string, IconMetadata>;

// 內部 registry 狀態
const iconRegistry: Ref<IconRegistry> = ref({});

/**
 * 設定 Icon Registry
 * @param registry - Icon 元數據 registry
 */
export function setIconRegistry(registry: IconRegistry): void {
  iconRegistry.value = registry;
}

/**
 * useIcon composable
 * 用於動態獲取 icon 元數據
 *
 * @param name - Icon 名稱
 * @returns Icon 元數據或 null
 *
 * @example
 * ```vue
 * <script setup>
 * import { useIcon } from '@iconforge/vue';
 *
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
export function useIcon(name: string): ComputedRef<IconMetadata | null> {
  return computed(() => iconRegistry.value[name] ?? null);
}

/**
 * 獲取所有 icon 名稱
 */
export function getIconNames(): ComputedRef<string[]> {
  return computed(() => Object.keys(iconRegistry.value));
}

/**
 * 檢查 icon 是否存在
 */
export function hasIcon(name: string): ComputedRef<boolean> {
  return computed(() => name in iconRegistry.value);
}
