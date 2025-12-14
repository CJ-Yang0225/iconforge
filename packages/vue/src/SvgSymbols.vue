<script setup lang="ts">
export interface SvgSymbolsProps {
  /** 要渲染的 symbols，透過 CLI 生成注入 */
  symbols?: string;
  /** 自訂 ID */
  id?: string;
}

defineOptions({
  name: 'SvgSymbols',
});

const props = withDefaults(defineProps<SvgSymbolsProps>(), {
  id: 'iconforge-symbols',
  symbols: '',
});
</script>

<template>
  <svg
    :id="props.id"
    xmlns="http://www.w3.org/2000/svg"
    style="position: absolute; width: 0; height: 0; overflow: hidden"
    aria-hidden="true"
    v-html="props.symbols"
  />
</template>
