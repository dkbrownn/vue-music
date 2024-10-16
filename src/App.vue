<script setup>
import { RouterView } from 'vue-router';
import Player  from '@/components/Player/Player.vue'
</script>
<template>
  <div class="wrapper">
    <RouterView/>
    <Player/>
  </div>
  
</template>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>