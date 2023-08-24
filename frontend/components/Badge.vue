<template>
    <div :class="$style.hitArea">
        <div :class="$style.container">
            <h3 :class="$style.title">{{ $t('plugin.donationBanner.title') }}</h3>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
  type?: ProfileBadge
}>()    
</script>

<style lang="scss" module>
.container {

}
</style>