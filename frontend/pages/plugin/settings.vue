<template>
  <main>
    <h1>{{ $t('plugin.settingsTitle') }}</h1>

    <PluginDonationBanner />
  </main>
</template>
  
<script setup lang="ts">
definePageMeta({
  layout: "plugin",
});
</script>
  
<style lang="scss">

</style>
  