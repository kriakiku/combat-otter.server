<template>
  <div :class="$style.hitArea">
    <div :class="$style.container">
      <h3 :class="$style.title">{{ $t('plugin.donationBanner.title') }}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" module>
.hitArea {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  &:hover .container {
    box-shadow: #000 0px 20px 30px -10px;
    background-position-x: 160%;
    background-position-y: -7rem;
    transform: translateY(-0.2em);
  }

  strong {
    font-weight: bold;
  }
}

.container {
  display: block;
  height: 3rem;
  padding: 1rem 1rem;
  background-color: #15161a;
  background-image: radial-gradient(circle, rgba(127, 0, 190, 0.421) 0%, transparent 55%);
  background-size: 60% 300%;
  background-position-x: 150%;
  background-position-y: -10rem;
  background-repeat: no-repeat;
  border-radius: 3px;
  transition: transform 240ms ease-out, background-position 2000ms ease-in-out;
}

.title {
  text-transform: uppercase;
  margin: 0;
}
</style>