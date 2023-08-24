<template>
  <div :class="$style.container">
    <client-only>
    <slot />
  </client-only>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('plugin.settingsTitle'),
})
</script>
  
<style lang="scss" module>
  @font-face {
    font-family: Victor Mono;
    src: url('@/assets/fonts/victor-mono.ttf');
  }

  :root {
    font-family: Victor Mono;
    background-color: #040404;
    color: #fff;
    width: 100%;
  }
</style>