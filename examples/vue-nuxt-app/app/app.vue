<script setup lang="ts">
import { SvgSymbols, Icon } from '~/components/icons/vue';
</script>

<template>
  <div>
    <!-- IconForge SVG Symbols (include once at root) -->
    <SvgSymbols />

    <NuxtRouteAnnouncer />
    
    <main class="container">
      <h1>IconForge Vue/Nuxt Example</h1>
      <p>This example demonstrates IconForge with Vue 3 and Nuxt 4.</p>

      <section class="icons-demo">
        <h2>Icons</h2>
        <div class="icon-grid">
          <div class="icon-item">
            <Icon name="home" :size="32" />
            <span>home</span>
          </div>
          <div class="icon-item">
            <Icon name="menu" :size="32" />
            <span>menu</span>
          </div>
          <div class="icon-item">
            <Icon name="close" :size="32" />
            <span>close</span>
          </div>
        </div>
      </section>

      <section class="icons-demo">
        <h2>With Colors</h2>
        <div class="icon-grid">
          <Icon name="home" :size="24" color="#3b82f6" />
          <Icon name="menu" :size="24" color="#22c55e" />
          <Icon name="close" :size="24" color="#ef4444" />
        </div>
      </section>

      <section class="icons-demo">
        <h2>With a11y Labels</h2>
        <div class="icon-grid">
          <Icon name="home" :size="24" aria-label="Home page" />
          <Icon name="menu" :size="24" aria-label="Open menu" />
        </div>
      </section>
    </main>
  </div>
</template>

<style>
body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 0.5rem;
}

.icons-demo {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.icons-demo h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.icon-grid {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.icon-item span {
  font-size: 0.875rem;
  color: #666;
}
</style>
