<script setup>
import useScroll from './useScroll'
const props = defineProps({
  click:{
    type: Boolean,
    default: true
  }
})
const rootRef = ref(null)
useScroll(rootRef, props)
</script>

<template>
<div ref="rootRef">
  <slot></slot>
</div>
</template>

<style scoped>

</style>