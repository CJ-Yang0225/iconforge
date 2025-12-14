<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

export interface IconProps {
  /** Icon name (matches generated IconName type) */
  name: string;
  /** Size in px (applies to both width and height) */
  size?: number | string;
  /** Width (overrides size) */
  width?: number | string;
  /** Height (overrides size) */
  height?: number | string;
  /** Color (applies via currentColor) */
  color?: string;
  /** Accessible label (for screen readers) */
  ariaLabel?: string;
}

defineOptions({
  name: 'Icon',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
});

const iconId = computed(() => `#${props.name}`);
const iconWidth = computed(() => props.width ?? props.size);
const iconHeight = computed(() => props.height ?? props.size);

const iconStyle = computed<CSSProperties>(() => ({
  display: 'inline-block',
  flexShrink: 0,
  color: props.color,
}));

const ariaHidden = computed(() => !props.ariaLabel);
</script>

<template>
  <svg
    :width="iconWidth"
    :height="iconHeight"
    :style="iconStyle"
    :aria-hidden="ariaHidden"
    :aria-label="ariaLabel"
    :role="ariaLabel ? 'img' : undefined"
    focusable="false"
    v-bind="$attrs"
  >
    <use :href="iconId" />
  </svg>
</template>
