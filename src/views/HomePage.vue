<script setup>
</script>

<template>
  <div class="container">
    <RouterView/>
  </div>
  <Tabbar/>
  <Toast v-show="false"/>
</template>

<style lang="scss" scoped>
.container{
  position: absolute;
  top: 0;
  bottom: 50Px;
  left: 0;
  right: 0;
  padding-bottom: 15Px;
}
</style>